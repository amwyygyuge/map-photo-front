import { observable, computed, action } from 'mobx';

interface Options<T> {
  index?: number;
  maxCache?: number;
  size: number;
  fetchLimit?: number;
  requestFunction: (index: number, limit: number) => Promise<T[]>;
  onNoMoreData?: () => void;
}

abstract class BaseFDC<T> {
  @observable
  loading: boolean = false;

  @observable.shallow
  private _cacheData: T[] = [];

  @computed
  get data() {
    return this._cacheData.slice(this._index, this._endIndex);
  }

  @computed
  protected get _endIndex() {
    return this._index + this._size;
  }

  @computed
  get maxIndex() {
    return this._cacheData.length - 1;
  }

  @observable
  protected _index: number;

  protected _maxCache: number;

  @observable
  protected _size: number;

  protected _fetchLimit: number;

  protected _requestFunction: Options<T>['requestFunction'];

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
  protected async _fetchData(index: number) {
    this.loading = true;
    const data = await this._requestFunction(index - 1, this._fetchLimit);
    this.loading = false;
    if (data.length === 0) {
      return false;
    }
    this._cacheData = this._cacheData.concat(data);
    return true;
  }
}

// 切片式
export class FDC<T> extends BaseFDC<T> {
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

// 增量式
export class SFDC<T> extends BaseFDC<T> {
  constructor(options: Options<T>) {
    super(options);
    const { onNoMoreData } = options;
    this._onNoMoreData = onNoMoreData;
  }

  private _step = this._size;

  @observable
  noMoreData = false;

  private _onNoMoreData: Options<T>['onNoMoreData'];

  @action
  async loadMore() {
    if (this.noMoreData) {
      this._onNoMoreData?.();
      return false;
    }
    if (this._endIndex + this._step <= this.maxIndex) {
      this._size = this._size + this._step;
      return;
    }
    const hasData = await this._fetchData(this._endIndex);
    if (hasData) {
      this._size = this._size + this._size;
      return;
    }
    this.noMoreData = true;
    this._onNoMoreData?.();
  }
}
