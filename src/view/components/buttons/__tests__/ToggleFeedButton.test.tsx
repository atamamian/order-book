import { fireEvent, render } from '@testing-library/react';
import { ETH } from '@/constants/markets';
import AppContext, { AppContextType, defaultAppContext } from '@/helpers/contexts';
import ToggleFeedButton from '../ToggleFeedButton';

const renderWithContext = (context: AppContextType = defaultAppContext) => {
  const { queryByTestId } = render(
    <AppContext.Provider value={context}>
      <ToggleFeedButton />
    </AppContext.Provider>,
  );

  return { queryByTestId };
};

describe('<ToggleFeedButton />', () => {
  it('changes market on click', () => {
    const mockContext = {
      ...defaultAppContext,
      selectedMarket: ETH,
      updateSelectedMarket: jest.fn(),
    };

    const { queryByTestId } = renderWithContext(mockContext);
    fireEvent.click(queryByTestId('toggle-feed-button') as HTMLElement);
    expect(mockContext.updateSelectedMarket).toHaveBeenCalled();
  });
});
