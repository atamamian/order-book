import { ReactElement } from 'react';
import { map } from 'lodash';

import { feedColumn } from '@/constants/styles';
import { FeedColumnProps } from '@/types/feedTypes';
import FeedRow from './FeedRow';

const FeedColumn = ({ feedData, feedType = 'buy' }: FeedColumnProps): ReactElement => (
  <div className={`column-${feedType}`} css={feedColumn}>
    <FeedRow categories={true} mode={feedType} />
    {map(feedData, (order, index) => (
      <FeedRow
        key={index}
        mode={feedType}
        price={order.price}
        size={order.size}
        total={order.total}
      />
    ))}
  </div>
);

export default FeedColumn;
