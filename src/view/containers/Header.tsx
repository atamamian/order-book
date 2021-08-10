import { ReactElement, useContext } from 'react';

import { header } from '@/constants/styles';
import Spread from '@/components/Spread';
import GroupSelect from '@/components/buttons/GroupSelect';
import AppContext from '@/helpers/contexts';

const Header = (): ReactElement => {
  const { askPrice, bidPrice, selectedMarket } = useContext(AppContext);
  return (
    <div css={header} data-testid="header">
      <div data-testid="title">Order Book</div>
      <Spread ask={askPrice} bid={bidPrice} />
      <GroupSelect tickSizes={selectedMarket.tickSizes} />
    </div>
  );
};

export default Header;
