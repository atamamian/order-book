export type FeedColumnProps = {
  feedData: Array<OrderObject>;
  feedType?: 'buy' | 'sell';
};

export type FeedRowProps = {
  categories?: boolean;
  feedType: 'buy' | 'sell';
  price?: string;
  size?: string;
  total?: string;
};

export type OrderObject = {
  price: string;
  size: string;
  total: string;
};

export type TickerData = {
  symbol: string;
  tickSizes: Array<string>;
};
