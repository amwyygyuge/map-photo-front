import { observable, computed, action } from 'mobx';

interface Options<T> {
  index?: number;
  maxCache: number;
  size: number;
  fetchLimit?: number;
  requestFunction: (index: number, limit: number) => Promise<T[]>;
  onNoMoreData?: () => void;
}
export class FDC<T> {
  @observable.shallow
  private _cacheData: T[] = [];

  @computed
  get data() {
    return this._cacheData.slice(this._index, this._endIndex);
  }

  @computed
  private get _endIndex() {
    return this._index + this._size;
  }

  @computed
  get maxIndex() {
    return this._cacheData.length - 1;
  }

  @observable
  private _index: number;

  private _maxCache: number;

  @observable
  private _size: number;

  private _fetchLimit: number;

  private _requestFunction: Options<T>['requestFunction'];

  constructor(options: Options<T>) {
    const { index, maxCache, size, requestFunction, fetchLimit } = options;
    this._index = index ?? 0;
    this._maxCache = maxCache ?? 100;
    this._size = size ?? 10;
    this._fetchLimit = fetchLimit ?? 20;
    this._requestFunction = requestFunction;
    this._fetchData(this._index);
  }

  @action
  private async _fetchData(index: number) {
    const data = await this._requestFunction(index - 1, this._fetchLimit);
    if (data.length === 0) {
      return false;
    }
    this._cacheData = this._cacheData.concat(data);
    return true;
  }

  @action
  async nextGroup() {
    if (this._endIndex + this._size <= this.maxIndex) {
      this._index = this._endIndex;
      return;
    }

    const hasData = await this._fetchData(this._endIndex);
    if (hasData) {
      this._index = this._endIndex;
      return;
    }
    this._index = 0;
  }
}

export class SFDC<T> {
  @observable.shallow
  private _cacheData: T[] = [];

  private _noMoreData = false;

  @computed
  get data() {
    return this._cacheData.slice(this._index, this._endIndex);
  }

  @computed
  private get _endIndex() {
    return this._index + this._size;
  }

  @computed
  get maxIndex() {
    return this._cacheData.length - 1;
  }

  @observable
  private _index: number;

  private _maxCache: number;

  @observable
  private _size: number;

  private _fetchLimit: number;

  private _requestFunction: Options<T>['requestFunction'];

  private _onNoMoreData: Options<T>['onNoMoreData'];

  constructor(options: Options<T>) {
    const { index, maxCache, size, requestFunction, fetchLimit, onNoMoreData } =
      options;
    this._index = index ?? 0;
    this._maxCache = maxCache ?? 100;
    this._size = size ?? 10;
    this._fetchLimit = fetchLimit ?? 20;
    this._requestFunction = requestFunction;
    this._onNoMoreData = onNoMoreData;
    this._fetchData(this._index);
  }

  @action
  private async _fetchData(index: number) {
    const data = await this._requestFunction(index - 1, this._fetchLimit);
    if (data.length === 0) {
      return false;
    }
    this._cacheData = this._cacheData.concat(data);
    return true;
  }

  @action
  async loadMore() {
    if (this._noMoreData) {
      this._onNoMoreData?.();
      return false;
    }
    if (this._endIndex + this._size <= this.maxIndex) {
      this._size = this._size + this._size;
      return;
    }
    const hasData = await this._fetchData(this._endIndex);
    if (hasData) {
      this._size = this._size + this._size;
      return;
    }
    this._noMoreData = true;
    this._onNoMoreData?.();
  }
}
