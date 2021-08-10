import { ReactElement } from 'react';
import { map } from 'lodash';

import { groupDropdown } from '@/constants/styles';

const GroupSelect = ({ tickSizes }: { tickSizes: Array<string> }): ReactElement => (
  <select css={groupDropdown} name="market-group" data-testid="market-group">
    {map(tickSizes, (value) => (
      <option key={value} value={value}>{`Group ${value}`}</option>
    ))}
  </select>
);

export default GroupSelect;
