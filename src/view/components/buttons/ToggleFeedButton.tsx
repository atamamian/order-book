import { ReactElement } from 'react';

import { toggleFeedButton } from '@/constants/styles';

const ToggleFeedButton = (): ReactElement => {
  return <div css={toggleFeedButton}>Toggle Feed</div>;
};

export default ToggleFeedButton;
