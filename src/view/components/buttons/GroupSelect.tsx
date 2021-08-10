import { ReactElement } from 'react';
import { get, map } from 'lodash';

import markets from '@/constants/markets';
import { groupDropdown } from '@/constants/styles';

const GroupSelect = ({ market = 'XBT' }: { market?: string }): ReactElement => (
  <select css={groupDropdown} name="market-group" data-testid="market-group">
    {map(get(markets, `${market}.tickSizes`, get(markets, 'XBT.tickSizes')), (value) => (
      <option key={value} value={value}>{`Group ${value}`}</option>
    ))}
  </select>
);

export default GroupSelect;
