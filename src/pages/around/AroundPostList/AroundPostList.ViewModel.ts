import { ViewModelWithModule } from '@/utils/index';
import { RecommendFDC } from '@/utils/FDC';
import { action, computed, observable } from 'mobx';

export class AroundPostListViewModel extends ViewModelWithModule {
  constructor() {
    super({});
    this.init();
  }

  @observable.shallow
  private _foc: RecommendFDC<Base.Post>;

  @computed
  get data() {
    return this._foc.data;
  }

  init = () => {
    const requestFunction = ({ scroll_id, limit }) =>
      this._recommendController.getRecommendGlobal({
        scroll_id,
        limit,
      });
    this._foc = new RecommendFDC<Base.Post>({
      requestFunction,
      size: 5,
      fetchLimit: 50,
      onNoMoreData() {
        console.log(1111);
      },
    });
    this._foc.init();
  };

  @action
  handleScrollToLower = () => {
    this._foc.loadMore();
  };
}
