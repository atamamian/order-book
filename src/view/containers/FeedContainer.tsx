import { ReactElement } from 'react';

import FeedColumn from '@/components/FeedColumn';
import Spread from '@/components/Spread';
import { feedContainer } from '@/constants/styles';

const FeedContainer = (): ReactElement => {
  return (
    <div css={feedContainer}>
      <FeedColumn />
      <Spread mode="mobile" />
      <FeedColumn feedType="sell" />
    </div>
  );
};

export default FeedContainer;
