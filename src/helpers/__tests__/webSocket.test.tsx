import AppStore from '@/store/AppStore.class';
import { getWebSocketMessage, retrieveSnapshot, parseWebSocketData } from '../webSocket';

describe('getWebSocketMessage({ connectionType, symbol })', () => {
  it('retrieves the message to send to the ws feed', () => {
    expect(getWebSocketMessage({ connectionType: 'subscribe', symbol: 'PI_XBTUSD' })).toStrictEqual(
      '{"event":"subscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]}',
    );
  });
});

describe('retrieveSnapshot({ client, queue, setData })', () => {
  const mockHandler = jest.fn();
  const mockSocket = new WebSocket('wss://test');
  it('does not call handler if no snapshot', () => {
    retrieveSnapshot({
      client: mockSocket,
      queue: {} as AppStore,
      setData: mockHandler,
    })({ data: '{ "asks": [], "bids": [], "feed": "book" }' } as MessageEvent);
    expect(mockHandler).not.toHaveBeenCalled();
  });
  it('parses the event data for the feed snapshot and sends it to the data handler', () => {
    retrieveSnapshot({
      client: mockSocket,
      queue: {} as AppStore,
      setData: mockHandler,
    })({ data: '{ "asks": [], "bids": [], "feed": "book_snapshot" }' } as MessageEvent);
    expect(mockHandler).toHaveBeenCalled();
    expect(mockSocket.onmessage).not.toBeNull();
  });
});

describe('parseWebSocketData({ queue, setData })', () => {
  const mockDate = jest.spyOn(Date, 'now');
  mockDate.mockImplementation(() => 100000);

  const mockStore = new AppStore();
  mockStore.addOrders = jest.fn();
  mockStore.clearOrders = jest.fn();
  const mockHandler = jest.fn();
  it('does not clear queue or call handler if ageInSeconds is less than 3', () => {
    parseWebSocketData({
      queue: mockStore,
      setData: mockHandler,
    })({ data: '{ "asks": [[1, 2]], "bids": [[3, 4]] }' } as MessageEvent);
    expect(mockStore.addOrders).toHaveBeenCalled();
    expect(mockStore.clearOrders).not.toHaveBeenCalled();
    expect(mockHandler).not.toHaveBeenCalled();
  });
  it('adds orders to queue, sends orders to handler after 3 seconds, and clears queue', async () => {
    mockStore.lastUpdated = 9000;

    parseWebSocketData({
      queue: mockStore,
      setData: mockHandler,
    })({ data: '{ "asks": [[1, 2]], "bids": [[3, 4]] }' } as MessageEvent);
    expect(mockStore.clearOrders).toHaveBeenCalled();
    expect(mockHandler).toHaveBeenCalled();
  });
});
