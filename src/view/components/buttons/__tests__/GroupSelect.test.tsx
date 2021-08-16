import { fireEvent, render } from '@testing-library/react';
import AppContext, { defaultAppContext } from '@/helpers/contexts';

import GroupSelect from '../GroupSelect';

const getContext = (context = {}) => {
  return {
    ...defaultAppContext,
    ...context,
  };
};

const renderWithContext = ({ context = getContext() } = {}) => {
  const { queryByTestId } = render(
    <AppContext.Provider value={context}>
      <GroupSelect />
    </AppContext.Provider>,
  );
  return { queryByTestId };
};

describe('<GroupSelect />', () => {
  it('returns `selectedMarket` tick sizes group', () => {
    const context = getContext({
      selectedMarket: {
        tickSizes: ['12.34'],
      },
    });
    const { queryByTestId } = renderWithContext({ context });
    expect(queryByTestId('market-group')?.innerHTML).toContain('Group 12.34');
  });
  it('calls `setGrouping` on dropdown select', () => {
    const mockSetGrouping = jest.fn();
    const context = getContext({
      setGrouping: mockSetGrouping,
    });
    const { queryByTestId } = renderWithContext({ context });
    fireEvent.change(queryByTestId('market-group') as HTMLElement, {
      target: { value: '23.45' },
    });
    expect(mockSetGrouping).toHaveBeenCalled();
  });
});
