import { ViewModelWithModule } from '@/utils/index';
import { RecommendFDC } from '@/utils/FDC';
import { action, computed, observable } from 'mobx';

export class AroundPostListViewModel extends ViewModelWithModule {
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

  init = async () => {
    const region = this._profileController.region;
    const requestFunction = ({ scroll_id, limit }) =>
      this._recommendController.getRecommendByLocation({
        region,
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
      const res = await this._profileModule.getPostByIds(ids);
      this.data = res;
    } else {
      this.data = [];
    }
  };
}
