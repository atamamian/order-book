import { ReactElement } from 'react';

import { killFeedButton } from '@/constants/styles';

const KillFeedButton = (): ReactElement => {
  return <button css={killFeedButton}>Kill Feed</button>;
};

export default KillFeedButton;
