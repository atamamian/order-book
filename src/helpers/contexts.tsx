import { createContext } from 'react';
import { noop } from 'lodash';
import { OrderObject, TickerData } from '@/types/feedTypes';

export type AppContextType = {
  askPrice: string;
  bidPrice: string;
  buyList: Array<OrderObject>;
  highestTotal: string;
  selectedMarket: TickerData;
  sellList: Array<OrderObject>;
  updateSelectedMarket: (market: TickerData) => void;
};

export const defaultAppContext: AppContextType = {
  askPrice: '',
  bidPrice: '',
  buyList: [],
  highestTotal: '',
  selectedMarket: {} as TickerData,
  sellList: [],
  updateSelectedMarket: noop,
};

export default createContext(defaultAppContext);
