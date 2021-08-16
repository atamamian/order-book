import { WebSocketResponseData } from '@/types/feedTypes';

class Collection {
  orders: WebSocketResponseData[] = [];

  add(value: WebSocketResponseData) {
    this.orders.push(value);
  }

  getOrders(): WebSocketResponseData[] {
    return this.orders;
  }

  refresh() {
    this.orders = [];
  }
}

class AppStore {
  timestamp = 0;
  orderStore = new Collection();

  constructor() {
    this.timestamp = Date.now();
  }

  get lastUpdated(): number {
    return this.timestamp;
  }

  set lastUpdated(timestamp: number) {
    this.timestamp = timestamp;
  }

  get ageInSeconds(): number {
    return Math.floor((Date.now() - this.timestamp) / 1000);
  }

  get orders(): WebSocketResponseData[] {
    return this._getCollectionOrders().getOrders();
  }

  _getCollectionOrders(): Collection {
    return this.orderStore;
  }

  _addCollectionOrders(collection: Collection, orders: WebSocketResponseData): void {
    collection.add(orders);
  }

  _clearCollection(collection: Collection): void {
    collection.refresh();
  }

  addOrders(orders: WebSocketResponseData): void {
    this._addCollectionOrders(this.orderStore, orders);
  }

  clearOrders(): void {
    this._clearCollection(this.orderStore);
  }
}

export default AppStore;
