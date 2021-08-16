import { createContext } from 'react';
import { noop } from 'lodash';
import { TickerData } from '@/types/feedTypes';

export type AppContextType = {
  askPrice: number;
  bidPrice: number;
  highestTotal: number;
  killFeed: () => void;
  selectedMarket: TickerData;
  setGrouping: (grouping: number) => Promise<void>;
  toggleFeed: () => void;
};

export const defaultAppContext: AppContextType = {
  askPrice: 0,
  bidPrice: 0,
  highestTotal: 0,
  killFeed: noop,
  selectedMarket: {} as TickerData,
  setGrouping: noop as (grouping: number) => Promise<void>,
  toggleFeed: noop,
};

export default createContext(defaultAppContext);
