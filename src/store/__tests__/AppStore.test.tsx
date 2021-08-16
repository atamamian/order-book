import AppStore from '../AppStore.class';

describe('AppStore', () => {
  const mockStore = new AppStore();
  it('adds order to store', () => {
    const mockData = { asks: [[1, 2]], bids: [[3, 4]] };
    mockStore.addOrders(mockData);
    expect(mockStore.orders[0]).toEqual(mockData);
  });
  it('clears order store', () => {
    mockStore.clearOrders();
    expect(mockStore.orders).toEqual([]);
  });
  it('returns age since last timestamp', () => {
    mockStore.lastUpdated = new Date('08/04/1993').getTime();
    expect(mockStore.ageInSeconds).toEqual(Math.floor((Date.now() - mockStore.lastUpdated) / 1000));
  });
});
