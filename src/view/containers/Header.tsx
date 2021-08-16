import { ReactElement } from 'react';

import { header } from '@/constants/styles';
import Spread from '@/components/Spread';
import GroupSelect from '@/components/buttons/GroupSelect';
import FeedRow from '@/components/FeedRow';

const Header = (): ReactElement => (
  <>
    <div css={header} data-testid="header">
      <div data-testid="title">Order Book</div>
      <Spread />
      <GroupSelect />
    </div>
    <FeedRow categories={true} mode="header" />
  </>
);

export default Header;
