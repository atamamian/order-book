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

/**
 * The initial function for our WebSocket client to retrieve the feed snapshot
 * and then set the WebSocket client's message handler to the parseWebSocketData
 * @param client - WebSocket client
 * @param queue - AppStore class used as our queue for the data
 * @param setData - Function to set our data for our feed
 */
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

/**
 * The WebSocket handler that parses the orders and adds them to the queue.
 * Every 3 seconds since the queue's last timestamp, it pulls our current orders queue,
 * clears the queue, and passes the orders to the app's feed data handler.
 * @param queue - AppStore class used as our queue for the data
 * @param setData - Function to set our data for our feed
 */
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
