import { ReactElement, useContext } from 'react';

import { toggleFeedButton } from '@/constants/styles';
import AppContext from '@/helpers/contexts';

const ToggleFeedButton = (): ReactElement => {
  const { toggleFeed } = useContext(AppContext);
  return (
    <button css={toggleFeedButton} data-testid="toggle-feed-button" onClick={toggleFeed}>
      Toggle Feed
    </button>
  );
};

export default ToggleFeedButton;
