import { ReactElement } from 'react';

import ToggleFeedButton from '@/components/buttons/ToggleFeedButton';
import KillFeedButton from '@/components/buttons/KillFeedButton';
import { feedFooter } from '@/constants/styles';

const FeedFooter = (): ReactElement => {
  return (
    <div css={feedFooter}>
      <ToggleFeedButton />
      <KillFeedButton />
    </div>
  );
};

export default FeedFooter;
