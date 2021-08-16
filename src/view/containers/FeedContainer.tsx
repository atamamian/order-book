import { ReactElement } from 'react';

import FeedColumn from '@/components/FeedColumn';
import LoadingSpinner from '@/components/LoadingSpinner';
import Spread from '@/components/Spread';
import { feedContainer } from '@/constants/styles';
import { OrderObject } from '@/types/feedTypes';

const FeedContainer = ({
  askList,
  bidList,
}: {
  askList: OrderObject[];
  bidList: OrderObject[];
}): ReactElement => {
  return (
    <div css={feedContainer}>
      {askList.length + bidList.length === 0 && <LoadingSpinner />}
      <FeedColumn feedData={bidList} />
      <Spread mode="mobile" />
      <FeedColumn feedData={askList} feedType="sell" />
    </div>
  );
};

export default FeedContainer;
