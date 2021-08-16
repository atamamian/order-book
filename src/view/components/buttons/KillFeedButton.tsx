import { ReactElement, useContext } from 'react';

import { killFeedButton } from '@/constants/styles';
import AppContext from '@/helpers/contexts';

const KillFeedButton = (): ReactElement => {
  const { killFeed } = useContext(AppContext);
  return (
    <button css={killFeedButton} data-testid="kill-feed-button" onClick={killFeed}>
      Kill Feed
    </button>
  );
};

export default KillFeedButton;
