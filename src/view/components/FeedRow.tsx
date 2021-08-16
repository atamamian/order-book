import { ReactElement, useContext } from 'react';
import { css } from '@emotion/react';

import AppContext from '@/helpers/contexts';
import { feedRowSegment, getStyles } from '@/constants/styles';
import { FeedRowProps } from '@/types/feedTypes';

const FeedRow = ({
  categories = false,
  mode = 'buy',
  price = 0,
  size = 0,
  total = 0,
}: FeedRowProps): ReactElement => {
  const { feedCategories, feedRow } = getStyles({ mode });
  const { highestTotal } = useContext(AppContext);

  const numberFormatter = (number: number, isPrice: boolean): string =>
    Number(number.toFixed(3)).toLocaleString(undefined, { minimumFractionDigits: isPrice ? 2 : 0 });

  let rowStyle;
  if (!categories) {
    const isBids = mode === 'buy';
    const barColor = isBids ? 'rgba(0,255,0,0.25)' : 'rgba(255,0,0,0.25)';
    const barPercent = Math.floor((total / highestTotal) * 100);
    rowStyle = css(
      {
        position: 'absolute',
        left: '0',
        width: `${barPercent}%`,
        height: '100%',
        float: 'left',
        backgroundColor: barColor,
        transition: 'width .5s ease-in-out',
      },
      `@media (min-width: 640px) {
        & {
          ${isBids ? 'right' : 'left'}: 0;
          ${isBids && 'left: unset;'}
        }
      }`,
    );
  }

  return categories ? (
    <div css={feedCategories}>
      <div css={feedRowSegment} data-testid="row-segment">
        <span>TOTAL</span>
      </div>
      <div css={feedRowSegment} data-testid="row-segment">
        <span>SIZE</span>
      </div>
      <div css={feedRowSegment} data-testid="row-segment">
        <span>PRICE</span>
      </div>
    </div>
  ) : (
    <div css={feedRow} data-testid="feed-row">
      <div css={feedRowSegment} data-testid="row-segment">
        <span className="total">{numberFormatter(total, false)}</span>
      </div>
      <div css={feedRowSegment} data-testid="row-segment">
        <span className="size">{numberFormatter(size, false)}</span>
      </div>
      <div css={feedRowSegment} data-testid="row-segment">
        <span className="price">{numberFormatter(price, true)}</span>
      </div>
      <div css={rowStyle} />
    </div>
  );
};

export default FeedRow;
