import { ReactElement } from 'react';

import FeedColumn from '@/components/FeedColumn';
import LoadingSpinner from '@/components/LoadingSpinner';
import ServiceErrorMessage from '@/components/ServiceErrorMessage';
import Spread from '@/components/Spread';
import { feedContainer } from '@/constants/styles';
import { OrderObject } from '@/types/feedTypes';

const FeedContainer = ({
  askList,
  bidList,
  serviceError = false,
}: {
  askList: OrderObject[];
  bidList: OrderObject[];
  serviceError?: boolean;
}): ReactElement => {
  return (
    <div css={feedContainer}>
      {askList.length + bidList.length === 0 && !serviceError && <LoadingSpinner />}
      {serviceError && <ServiceErrorMessage />}
      <FeedColumn feedData={bidList} />
      <Spread mode="mobile" />
      <FeedColumn feedData={askList} feedType="sell" />
    </div>
  );
};

export default FeedContainer;
