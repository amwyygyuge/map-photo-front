import { action, computed, observable } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';
import { RecommendFDC } from '@/utils/FDC';

export class HotSpotViewModel extends ViewModelWithModule {
  @observable
  currentIndex: number = 0;

  @action
  handleTabClick = (index: number) => {
    this._updateFoc(index);
    this.currentIndex = index;
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
    ];
  }

  constructor() {
    super({});
    this.init();
    this._reaction(
      () => this.ids,
      (ids) => {
        this.fetchData(ids);
      },
      { fireImmediately: true },
    );
  }

  @observable.shallow
  data: Base.PostWithUser[] = [];

  @observable.shallow
  private _recommendFDC: RecommendFDC<number>;

  @computed
  get ids() {
    if (this._recommendFDC) {
      return this._recommendFDC.data;
    }
    return [];
  }

  @action
  _updateFoc = (index: number) => {
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

  init = () => {
    this._updateFoc(0);
  };

  @action
  handleScrollToLower = () => {
    this._recommendFDC.loadMore();
  };

  @action
  fetchData = async (ids: number[]) => {
    if (ids.length !== 0) {
      const res = await this._postModule.getPostByIds(ids);
      this.data = res;
    } else {
      this.data = [];
    }
  };
}
