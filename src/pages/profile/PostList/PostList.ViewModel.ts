import { action, computed, observable } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';
import { Post } from '@/utils/RequestType';
import { SFDC } from '@/utils/FDC';

export type PostListViewModelProps = {
  userId: number;
};
export class PostListViewModel extends ViewModelWithModule<PostListViewModelProps> {
  constructor(props: PostListViewModelProps) {
    super(props);
    this.init();
  }

  @observable.shallow
  private _foc: SFDC<Post>;

  @computed
  private get _data() {
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

  @computed
  get columns() {
    const column1: Post[] = [];
    const column2: Post[] = [];

    for (let i = 0; i < this._data.length; i++) {
      if (i % 2 === 1) {
        column1.push(this._data[i]);
      } else {
        column2.push(this._data[i]);
      }
    }
    return [column1, column2];
  }

  init = async () => {
    const params = this._appModule.getRouterParams();
    const requestFunction = (index: number, limit: number) =>
      this._profileModule.getUserPost(params.userId, index, limit);
    this._foc = new SFDC<Post>({
      requestFunction,
      size: 5,
      fetchLimit: 5,
      onNoMoreData() {
        console.log(1111);
      },
    });
  };

  @action
  handleScrollToLower = () => {
    this._foc.loadMore();
  };
}
