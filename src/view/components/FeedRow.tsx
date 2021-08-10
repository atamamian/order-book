import { ReactElement } from 'react';

import { getStyles } from '@/constants/styles';
import { FeedRowProps } from '@/types/feedTypes';

const FeedRow = ({
  categories = false,
  feedType,
  price = '0',
  size = '0',
  total = '0',
}: FeedRowProps): ReactElement => {
  const { feedCategories, feedRow } = getStyles({ mode: feedType });

  return categories ? (
    <div css={feedCategories}>
      <span>TOTAL</span>
      <span>SIZE</span>
      <span>PRICE</span>
    </div>
  ) : (
    <div css={feedRow} data-testid="feed-row">
      <span className="total">{total}</span>
      <span className="size">{size}</span>
      <span className="price">{price}</span>
    </div>
  );
};

export default FeedRow;
