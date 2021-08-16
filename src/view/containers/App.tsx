import { Component, ReactElement } from 'react';
import { head, last, map, throttle } from 'lodash';
import { Global } from '@emotion/react';

import { ETH, XBT } from '@/constants/markets';
import { globalStyles, wrapper } from '@/constants/styles';
import { webSocketConnectionTypes } from '@/constants/webSocket';
import AppContext from '@/helpers/contexts';
import { getWebSocketMessage, retrieveSnapshot } from '@/helpers/webSocket';
import AppStore from '@/store/AppStore.class';
import { OrderList, TickerData, WebSocketResponseData } from '@/types/feedTypes';
import Header from './Header';
import FeedContainer from './FeedContainer';
import FeedFooter from './FeedFooter';
import { formatListForFeed } from '@/helpers/feed';

const webSocketClient = new WebSocket('wss://www.cryptofacilities.com/ws/v1');
const { SUBSCRIBE, UNSUBSCRIBE } = webSocketConnectionTypes;

class App extends Component {
  appStore = new AppStore();
  buyMap = new Map();
  sellMap = new Map();

  state = {
    askList: [],
    askPrice: 0,
    bidList: [],
    bidPrice: 0,
    grouping: Number(XBT.tickSizes[0]),
    highestTotal: 0,
    selectedMarket: XBT,
  };

  constructor(props: Record<string, never>) {
    super(props);

    this.clearFeedData = this.clearFeedData.bind(this);
    this.handleFeedData = this.handleFeedData.bind(this);
    this.killFeed = this.killFeed.bind(this);
    this.setGrouping = this.setGrouping.bind(this);
    this.toggleFeed = this.toggleFeed.bind(this);
  }

  componentDidMount(): void {
    const { selectedMarket } = this.state;
    webSocketClient.onopen = () =>
      webSocketClient.send(
        getWebSocketMessage({ connectionType: SUBSCRIBE, symbol: selectedMarket.symbol }),
      );
    webSocketClient.onmessage = retrieveSnapshot({
      client: webSocketClient,
      queue: this.appStore,
      setData: this.handleFeedData,
    });
    // webSocketClient.onclose = () => void;
    // webSocketClient.onerror = () => handleWebSocketError();
  }

  async clearFeedData({
    grouping,
    market,
  }: {
    grouping: number;
    market: TickerData;
  }): Promise<void> {
    await this.setState({
      askList: [],
      askPrice: 0,
      bidList: [],
      bidPrice: 0,
      grouping,
      highestTotal: 0,
      selectedMarket: market,
    });
  }

  killFeed(): void {
    const { selectedMarket } = this.state;
    if (webSocketClient.readyState === webSocketClient.OPEN) {
      webSocketClient.send(
        getWebSocketMessage({ connectionType: UNSUBSCRIBE, symbol: selectedMarket.symbol }),
      );
    }
  }

  async toggleFeed(): Promise<void> {
    const { selectedMarket } = this.state;
    webSocketClient.onmessage = null;
    if (webSocketClient.readyState === webSocketClient.OPEN) {
      webSocketClient.send(
        getWebSocketMessage({ connectionType: UNSUBSCRIBE, symbol: selectedMarket.symbol }),
      );
    }
    this.buyMap.clear();
    this.sellMap.clear();
    this.appStore.clearOrders();
    this.appStore.lastUpdated = Date.now();
    const newMarket = selectedMarket === XBT ? ETH : XBT;
    await this.clearFeedData({ grouping: Number(newMarket.tickSizes[0]), market: newMarket });
    if (webSocketClient.readyState === webSocketClient.OPEN) {
      webSocketClient.onmessage = retrieveSnapshot({
        client: webSocketClient,
        queue: this.appStore,
        setData: this.handleFeedData,
      });
      webSocketClient.send(
        getWebSocketMessage({ connectionType: SUBSCRIBE, symbol: newMarket.symbol }),
      );
    }
  }

  updateMap = ({ orders, list }: { orders: number[][]; list: OrderList }): void => {
    map(orders, (order) => {
      const orderObj = list.get(order[0]);
      if (orderObj) {
        if (order[1] === 0) {
          list.delete(order[0]);
        } else {
          list.set(order[0], { ...orderObj, size: order[1] });
        }
      } else if (order[1] > 0) {
        list.set(order[0], { price: order[0], size: order[1], total: 0 });
      }
    });
  };

  handleFeedData(orders: WebSocketResponseData[]): void {
    orders.forEach((order) => {
      this.updateMap({ orders: order?.asks || [], list: this.sellMap });
      this.updateMap({ orders: order?.bids || [], list: this.buyMap });
    });
    this.refreshFeed();
  }

  refreshFeed(): void {
    const { grouping } = this.state;
    const asks = formatListForFeed({
      groupStep: grouping,
      list: this.sellMap,
      orderType: 'sell',
    });
    const bids = formatListForFeed({
      groupStep: grouping,
      list: this.buyMap,
      orderType: 'buy',
    });
    const highestAskTotal = last(asks)?.total || 0;
    const highestBidTotal = last(bids)?.total || 0;
    const newHighestTotal = highestAskTotal > highestBidTotal ? highestAskTotal : highestBidTotal;
    this.setState({
      askList: asks,
      askPrice: head(asks)?.price || 0,
      bidList: bids,
      bidPrice: head(bids)?.price || 0,
      highestTotal: newHighestTotal,
    });
  }

  async setGrouping(grouping: number): Promise<void> {
    await this.setState({ grouping });
    this.refreshFeed();
  }

  throttledToggle = throttle(this.toggleFeed, 500, { trailing: false });

  render(): ReactElement {
    const { askList, askPrice, bidList, bidPrice, highestTotal, selectedMarket } = this.state;
    return (
      <>
        <Global styles={globalStyles} />
        <div css={wrapper} data-testid="wrapper">
          <AppContext.Provider
            value={{
              askPrice,
              bidPrice,
              highestTotal,
              killFeed: this.killFeed,
              selectedMarket,
              setGrouping: this.setGrouping,
              toggleFeed: this.throttledToggle.bind(this),
            }}
          >
            <Header />
            <FeedContainer askList={askList} bidList={bidList} />
            <FeedFooter />
          </AppContext.Provider>
        </div>
      </>
    );
  }
}

export default App;
