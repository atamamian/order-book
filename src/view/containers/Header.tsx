import { ReactElement } from 'react';

import { header } from '@/constants/styles';
import Spread from '@/components/Spread';
import GroupSelect from '@/components/buttons/GroupSelect';

const Header = (): ReactElement => (
  <div css={header} data-testid="header">
    <div data-testid="title">Order Book</div>
    <Spread />
    <GroupSelect />
  </div>
);

export default Header;
