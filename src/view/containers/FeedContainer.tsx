import { ReactElement, useContext } from 'react';

import FeedColumn from '@/components/FeedColumn';
import Spread from '@/components/Spread';
import { feedContainer } from '@/constants/styles';
import AppContext from '@/helpers/contexts';

const FeedContainer = (): ReactElement => {
  const { askPrice, bidPrice, buyList, sellList } = useContext(AppContext);
  return (
    <div css={feedContainer}>
      <FeedColumn feedData={buyList} />
      <Spread ask={askPrice} bid={bidPrice} mode="mobile" />
      <FeedColumn feedData={sellList} feedType="sell" />
    </div>
  );
};

export default FeedContainer;
