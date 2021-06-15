import { action, computed, observable } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';
import { BaseFDC } from '@/utils/FDC';

export type PostListViewModelProps = {
  userId: number;
};
export class PostListViewModel extends ViewModelWithModule<PostListViewModelProps> {
  constructor(props: PostListViewModelProps) {
    super(props);
    this.init();
  }

  @observable.shallow
  private _foc: BaseFDC<Base.Post>;

  @computed
  get data() {
    console.log(this._foc.data.length);
    return this._foc.data;
  }

  @computed
  get dataStatus() {
    if (this._foc.loading) {
      return 'loading';
    }
    if (this._foc.noMoreData) {
      return 'noMore';
    }
    return false;
  }

  init = () => {
    const params = this._appModule.getRouterParams();
    const requestFunction = ({
      index,
      limit,
    }: {
      index: number;
      limit: number;
    }) => this._profileModule.getUserPost(params.userId, index, limit);
    this._foc = new BaseFDC<Base.Post>({
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
