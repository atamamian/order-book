import { ReactElement } from 'react';
import { map } from 'lodash';

import { feedColumn } from '@/constants/styles';
import { FeedColumnProps } from '@/types/feedTypes';
import FeedRow from './FeedRow';

const FeedColumn = ({ feedData, feedType = 'buy' }: FeedColumnProps): ReactElement => {
  return (
    <div css={feedColumn}>
      <FeedRow categories={true} feedType={feedType} />
      {map(feedData, (dataSet) => (
        <FeedRow
          feedType={feedType}
          key={dataSet.price}
          price={dataSet.price}
          size={dataSet.size}
          total={dataSet.total}
        />
      ))}
    </div>
  );
};

export default FeedColumn;
