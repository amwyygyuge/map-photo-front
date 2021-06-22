import { action, computed, observable } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';
import { RecommendFDC } from '@/utils/FDC';

export class HotSpotViewModel extends ViewModelWithModule {
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

  init = () => {
    const requestFunction = ({ scroll_id, limit }) =>
      this._recommendController.getRecommendGlobal({
        scroll_id,
        limit,
      });
    this._recommendFDC = new RecommendFDC<number>({
      requestFunction,
    });
    this._recommendFDC.init();
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
