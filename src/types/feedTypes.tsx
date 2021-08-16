export type FeedColumnProps = {
  feedData: OrderObject[];
  feedType?: 'buy' | 'sell';
};

export type WebSocketResponseData = {
  asks?: number[][];
  bids?: number[][];
};

export type FeedRowProps = {
  categories?: boolean;
  mode?: 'buy' | 'sell' | 'header';
  price?: number;
  size?: number;
  total?: number;
};

export type OrderList = Map<number, OrderObject>;

export type OrderObject = {
  price: number;
  size: number;
  total: number;
};

export type TickerData = {
  symbol: string;
  tickSizes: Array<string>;
};
