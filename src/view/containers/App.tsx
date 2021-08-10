import { FC, ReactElement } from 'react';
import { Global } from '@emotion/react';

import { globalStyles, wrapper } from '@/constants/styles';
import Header from './Header';
import FeedContainer from './FeedContainer';
import FeedFooter from './FeedFooter';

const App: FC = (): ReactElement => (
  <>
    <Global styles={globalStyles} />
    <div css={wrapper} data-testid="wrapper">
      <Header />
      <FeedContainer />
      <FeedFooter />
    </div>
  </>
);

export default App;
