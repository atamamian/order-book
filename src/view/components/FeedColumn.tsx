import { ReactElement } from 'react';

import { feedColumn } from '@/constants/styles';
import FeedRow from './FeedRow';

const FeedColumn = ({ feedType = 'buy' }: { feedType?: 'buy' | 'sell' }): ReactElement => {
  return (
    <div css={feedColumn}>
      <FeedRow categories={true} feedType={feedType} />
      <FeedRow feedType={feedType} />
      <FeedRow feedType={feedType} />
    </div>
  );
};

export default FeedColumn;
