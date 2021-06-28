import { action, computed, observable } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';
import { RecommendFDC, BaseFDC } from '@/utils/FDC';

export class HotSpotViewModel extends ViewModelWithModule {
  @observable
  currentIndex: number = 0;

  @action
  handleTabClick = (index: number) => {
    this.currentIndex = index;
    if (index === 2) {
      this._updatePublishersFDC(index);
    } else {
      this._updateRecommendFDC(index);
    }
  };

  get tabList() {
    return [
      {
        title: '热点',
        requestFunctionKey: 'getRecommendGlobal',
      },
      {
        title: '最新',
        requestFunctionKey: 'getRecommendNew',
      },
      {
        title: '关注',
        requestFunctionKey: 'getByPublishers',
      },
    ];
  }

  constructor() {
    super({});
    this.init();
    this._reaction(
      () => this._recommendIds,
      (ids: number[]) => {
        this.fetchData(ids);
      },
      { fireImmediately: true },
    );
  }

  @computed
  get data() {
    if (this.currentIndex === 2) {
      return this._publishersFDC ? this._publishersFDC.data : [];
    }
    return this._recommendData;
  }

  @observable.shallow
  _recommendData: Base.PostWithUser[] = [];

  @observable.shallow
  private _recommendFDC: RecommendFDC<number>;

  @observable.shallow
  private _publishersFDC: BaseFDC<Base.PostWithUser>;

  @computed
  private get _recommendIds() {
    if (this._recommendFDC) {
      return this._recommendFDC.data;
    }
    return [];
  }

  @action
  _updateRecommendFDC = (index: number) => {
    const key = this.tabList[index].requestFunctionKey;
    const requestFunction = ({ scroll_id, limit }) =>
      this._recommendController[key]({
        scroll_id,
        limit,
      });
    this._recommendFDC = new RecommendFDC<number>({
      requestFunction,
    });
    this._recommendFDC.init();
  };

  @action
  _updatePublishersFDC = (index: number) => {
    const key = this.tabList[index].requestFunctionKey;
    const requestFunction = ({ scroll_id, limit }) =>
      this._recommendController[key]({
        scroll_id,
        limit,
      });
    this._publishersFDC = new BaseFDC<Base.PostWithUser>({
      requestFunction,
    });
    this._publishersFDC.init();
  };

  init = () => {
    this._updateRecommendFDC(0);
  };

  @action
  handleScrollToLower = () => {
    if (this.currentIndex === 2) {
      this._publishersFDC.loadMore();
    } else {
      this._recommendFDC.loadMore();
    }
  };

  @action
  fetchData = async (ids: number[]) => {
    if (ids.length !== 0) {
      const res = await this._postModule.getPostByIds(ids);
      this._recommendData = res;
    } else {
      this._recommendData = [];
    }
  };
}
