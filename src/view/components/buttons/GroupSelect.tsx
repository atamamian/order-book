import { ReactElement, useContext } from 'react';
import { map } from 'lodash';

import { groupDropdown } from '@/constants/styles';
import AppContext from '@/helpers/contexts';

const GroupSelect = (): ReactElement => {
  const { selectedMarket, setGrouping } = useContext(AppContext);
  return (
    <select
      css={groupDropdown}
      data-testid="market-group"
      name="market-group"
      onChange={(evt) => setGrouping(Number(evt.target.value))}
    >
      {map(selectedMarket.tickSizes, (value) => (
        <option
          data-testid={`option-${value}`}
          key={value}
          value={value}
        >{`Group ${value}`}</option>
      ))}
    </select>
  );
};

export default GroupSelect;
