import { ReactElement, useContext } from 'react';

import { ETH, XBT } from '@/constants/markets';
import { toggleFeedButton } from '@/constants/styles';
import AppContext from '@/helpers/contexts';

const ToggleFeedButton = (): ReactElement => {
  const { selectedMarket, updateSelectedMarket } = useContext(AppContext);
  const newMarket = selectedMarket === ETH ? XBT : ETH;
  return (
    <button
      css={toggleFeedButton}
      data-testid="toggle-feed-button"
      onClick={() => updateSelectedMarket(newMarket)}
    >
      Toggle Feed
    </button>
  );
};

export default ToggleFeedButton;
