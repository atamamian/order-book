import { ReactElement, useState } from 'react';
import { Global } from '@emotion/react';

import { XBT } from '@/constants/markets';
import { globalStyles, wrapper } from '@/constants/styles';
import AppContext from '@/helpers/contexts';
import { OrderObject, TickerData } from '@/types/feedTypes';
import Header from './Header';
import FeedContainer from './FeedContainer';
import FeedFooter from './FeedFooter';

const App = (): ReactElement => {
  const [askPrice, setAskPrice] = useState('');
  const [bidPrice, setBidPrice] = useState('');
  const [buyList, setBuyList] = useState([] as Array<OrderObject>);
  const [highestTotal, setHighestTotal] = useState('');
  const [selectedMarket, setSelectedMarket] = useState(XBT);
  const [sellList, setSellList] = useState([] as Array<OrderObject>);

  const context = {
    askPrice,
    bidPrice,
    buyList,
    highestTotal,
    selectedMarket,
    sellList,
    updateSelectedMarket: (market: TickerData) => setSelectedMarket(market),
  };

  return (
    <>
      <Global styles={globalStyles} />
      <div css={wrapper} data-testid="wrapper">
        <AppContext.Provider value={context}>
          <Header />
          <FeedContainer />
          <FeedFooter />
        </AppContext.Provider>
      </div>
    </>
  );
};

export default App;
