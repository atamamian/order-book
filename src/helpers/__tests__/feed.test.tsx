import { OrderObject } from '@/types/feedTypes';
import { formatListForFeed } from '../feed';

const mockOrders = [
  { price: 1000, size: 100, total: 0 },
  { price: 1000.5, size: 100, total: 0 },
];

describe('formatListForFeed(groupStep, list, orderType)', () => {
  const list = new Map<number, OrderObject>();
  mockOrders.forEach((order) =>
    list.set(order.price, { price: order.price, size: order.size, total: 0 }),
  );

  it('returns empty list by default', () => {
    const groupStep = 0.5;
    const orderType = 'buy';
    expect(formatListForFeed({ groupStep, list: new Map(), orderType })).toStrictEqual([]);
  });
  it('returns list in OrderObject[] format', () => {
    const groupStep = 0.5;
    const orderType = 'sell';
    const formattedList = formatListForFeed({ groupStep, list, orderType });
    expect(formattedList[0]).toStrictEqual({
      ...mockOrders[0],
      total: mockOrders[0].size,
    });
    expect(formattedList[1]).toStrictEqual({
      ...mockOrders[1],
      total: mockOrders[0].size + mockOrders[1].size,
    });
  });
  it('sorts reverse for buy list in OrderObject[] format', () => {
    const groupStep = 0.5;
    const orderType = 'buy';
    const formattedList = formatListForFeed({ groupStep, list, orderType });
    expect(formattedList[0]).toStrictEqual({
      ...mockOrders[1],
      total: mockOrders[1].size,
    });
    expect(formattedList[1]).toStrictEqual({
      ...mockOrders[0],
      total: mockOrders[0].size + mockOrders[1].size,
    });
  });
  it('flatten down orders based on groupStep and price', () => {
    const groupStep = 1;
    const orderType = 'buy';

    const formattedList = formatListForFeed({ groupStep, list, orderType });
    expect(formattedList.length).toStrictEqual(1);
    expect(formattedList[0]).toStrictEqual({ price: 1000, size: 200, total: 200 });
  });
  it('rounds to next price level correctly for both orderTypes', () => {
    const groupStep = 1;
    const mockList = new Map();
    mockList.set(1001, { price: 1001, size: 5, total: 0 });
    mockList.set(1000.5, { price: 1000.5, size: 5, total: 0 });
    mockList.set(1000, { price: 1000, size: 5, total: 0 });
    mockList.set(902, { price: 902, size: 5, total: 0 });
    mockList.set(900.5, { price: 900.5, size: 5, total: 0 });
    mockList.set(899.5, { price: 899.5, size: 5, total: 0 });
    mockList.set(899, { price: 899, size: 5, total: 0 });
    mockList.set(898.5, { price: 898.5, size: 5, total: 0 });

    const formattedBuyList = formatListForFeed({ groupStep, list: mockList, orderType: 'buy' });
    const formattedSellList = formatListForFeed({ groupStep, list: mockList, orderType: 'sell' });

    expect(formattedBuyList.length).toStrictEqual(6);
    expect(formattedSellList.length).toStrictEqual(6);

    expect(formattedBuyList).toStrictEqual([
      { price: 1001, size: 5, total: 5 },
      { price: 1000, size: 10, total: 15 },
      { price: 902, size: 5, total: 20 },
      { price: 900, size: 5, total: 25 },
      { price: 899, size: 10, total: 35 },
      { price: 898, size: 5, total: 40 },
    ]);
    expect(formattedSellList).toStrictEqual([
      { price: 899, size: 10, total: 10 },
      { price: 900, size: 5, total: 15 },
      { price: 901, size: 5, total: 20 },
      { price: 902, size: 5, total: 25 },
      { price: 1000, size: 5, total: 30 },
      { price: 1001, size: 10, total: 40 },
    ]);
  });
  it('trims to 20 orders if length > 20', () => {
    const groupStep = 0.5;
    const orderType = 'buy';
    const mockList = new Map();
    for (let i = 0; i < 30; i++) {
      mockList.set(i * 1000, { price: i * 1000, size: i * 1000, total: 0 });
    }

    expect(formatListForFeed({ groupStep, list: mockList, orderType }).length).toStrictEqual(20);
  });
});
