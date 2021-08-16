import { includes } from 'lodash';
import AppStore from '@/store/AppStore.class';
import { WebSocketResponseData } from '@/types/feedTypes';

export const getWebSocketMessage = ({
  connectionType,
  symbol,
}: {
  connectionType: string;
  symbol: string;
}): string => `{"event":"${connectionType}","feed":"book_ui_1","product_ids":["${symbol}"]}`;

export const retrieveSnapshot =
  ({
    client,
    queue,
    setData,
  }: {
    client: WebSocket;
    queue: AppStore;
    setData: (data: WebSocketResponseData[]) => void;
  }) =>
  (evt: MessageEvent): void => {
    const data = JSON.parse(evt.data);
    if (includes(data.feed, 'snapshot')) {
      const { asks, bids } = data;
      setData([{ asks, bids }]);
      client.onmessage = parseWebSocketData({ queue, setData });
    }
  };

export const parseWebSocketData =
  ({ queue, setData }: { queue: AppStore; setData: (data: WebSocketResponseData[]) => void }) =>
  (evt: MessageEvent): void => {
    const data = JSON.parse(evt.data);
    queue.addOrders(data);

    if (queue.ageInSeconds > 3) {
      const orders = queue.orders;
      queue.clearOrders();
      setData(orders);
      queue.lastUpdated = Date.now();
    }
  };
