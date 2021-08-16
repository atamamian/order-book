import { render } from '@testing-library/react';
import AppContext, { defaultAppContext } from '@/helpers/contexts';

import Spread from '../Spread';

const getContext = (context = {}) => {
  return {
    ...defaultAppContext,
    ...context,
  };
};

const renderWithContext = ({ context = getContext() } = {}) => {
  const { queryByTestId } = render(
    <AppContext.Provider value={context}>
      <Spread />
    </AppContext.Provider>,
  );
  return { queryByTestId };
};
describe('<Spread />', () => {
  it('renders with default props', () => {
    const { queryByTestId } = renderWithContext();
    expect(queryByTestId('spread-data')?.innerHTML).toEqual(`ETH - Spread: 0.0 (0%)`);
  });
  it('displays passed props', () => {
    const context = getContext({
      askPrice: 124,
      bidPrice: 123,
      selectedMarket: {
        symbol: 'PI_XBTUSD',
      },
    });
    const { queryByTestId } = renderWithContext({ context });
    expect(queryByTestId('spread-data')?.innerHTML).toEqual(`XBT - Spread: 1.0 (0.81%)`);
  });
});
