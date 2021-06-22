import { observable, computed, action } from 'mobx';

interface Options<T> {
  index?: number;
  maxCache?: number;
  size?: number;
  fetchLimit?: number;
  requestFunction: (p: any) => Promise<T[]>;
  onNoMoreData?: () => void;
}

export class BaseFDC<T> {
  @observable
  loading: boolean = false;

  @observable.shallow
  private _cacheData: T[] = [];

  protected _step: number;

  @observable
  noMoreData = false;

  @computed
  get data() {
    return this._cacheData.slice(this._index, this._endIndex);
  }

  @computed
  protected get _endIndex() {
    if (this._index + this._size > this._maxIndex) {
      return this._maxIndex;
    }
    return this._index + this._size;
  }

  @computed
  protected get _maxIndex() {
    return this._cacheData.length;
  }

  @computed
  protected get _rest() {
    return this._maxIndex - this._endIndex;
  }

  @computed
  protected get _hasData() {
    return this._rest > 0;
  }

  @computed
  protected get _realStep() {
    return this._rest > this._step ? this._step : this._rest;
  }

  @observable
  protected _index: number;

  protected _maxCache: number;

  @observable
  protected _size: number;

  protected _fetchLimit: number;

  protected _requestFunction: Options<T>['requestFunction'];

  protected _onNoMoreData?: Options<T>['onNoMoreData'];

  constructor(options: Options<T>) {
    const { index, maxCache, size, requestFunction, fetchLimit, onNoMoreData } =
      options;
    this._index = index ?? 0;
    this._maxCache = maxCache ?? 100;
    this._size = size ?? 10;
    this._step = size ?? 10;
    this._fetchLimit = fetchLimit ?? 20;
    this._requestFunction = requestFunction;
    this._onNoMoreData = onNoMoreData;
  }

  init = () => {
    this._fetchData(this._index);
  };

  @action
  protected async _fetchData(index: number | string) {
    this.loading = true;
    const data = await this._handleRequest(index);
    this.loading = false;
    if (data.length === 0) {
      return false;
    }
    this._cacheData = this._cacheData.concat(data);
    return true;
  }

  protected _handleRequest(index: number | string) {
    return this._requestFunction({
      index: ((index ?? this._endIndex) as number) - 1,
      limit: this._fetchLimit,
    });
  }

  // 切片式
  @action
  async nextGroup() {
    if (this._hasData) {
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

  // 增量式
  @action
  async loadMore() {
    if (this.noMoreData) {
      this._onNoMoreData?.();
      return false;
    }

    if (this._hasData) {
      this._size = this._size + this._realStep;
      return;
    }
    const hasData = await this._fetchData(this._endIndex);
    if (hasData) {
      this._size = this._size + this._realStep;
      return;
    }

    this.noMoreData = true;
    this._onNoMoreData?.();
  }
}

export class RecommendFDC<T> extends BaseFDC<T> {
  private _scrollId: string = '-1';

  init = () => {
    this._fetchData(this._scrollId);
  };

  @action
  protected async _handleRequest(index: number | string) {
    const { list, scroll_id } = await this._requestFunction({
      scroll_id: index ?? this._scrollId,
      limit: this._fetchLimit,
    });
    this._scrollId = scroll_id;
    return list;
  }

  @action
  async nextGroup() {
    if (this._endIndex + this._size <= this._maxIndex) {
      this._index = this._endIndex;
      return;
    }
    const hasData = await this._fetchData(this._scrollId);
    if (hasData) {
      this._index = this._endIndex;
      return;
    }
    this._index = 0;
  }

  // 增量式
  @action
  async loadMore() {
    if (this.noMoreData) {
      this._onNoMoreData?.();
      return false;
    }

    if (this._hasData) {
      this._size = this._size + this._realStep;
      return;
    }
    const hasData = await this._fetchData(this._scrollId);

    if (hasData) {
      this._size = this._size + this._realStep;
      return;
    }

    this.noMoreData = true;
    this._onNoMoreData?.();
  }
}
