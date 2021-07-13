import { action, computed, observable } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';
import { BaseFDC } from '@/utils/FDC';

export class ListViewModel extends ViewModelWithModule {
  @observable.shallow
  private _FDC: BaseFDC<Base.Notify>;

  @computed
  get data() {
    if (this._FDC) {
      return this._FDC.data;
    }
    return [];
  }

  constructor(props: {}) {
    super(props);
    this.init();
  }

  @action
  init = () => {
    const requestFunction = ({ scroll_id, limit }) =>
      this._notifyModule.getUnRead({ scroll_id, limit });
    this._FDC = new BaseFDC({
      requestFunction,
    });
    this._FDC.init();
  };

  @action
  handleScrollToLower = () => {
    this._FDC.loadMore();
  };
}
