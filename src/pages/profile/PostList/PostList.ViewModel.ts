import { action, computed, observable } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';
import { BaseFDC } from '@/utils/FDC';

export type PostListViewModelProps = {
  userId: number;
};

const config = {
  self: {
    title: '我的作品',
    functionName: 'getUserPost',
  },
  like: {
    title: '点赞的作品',
    functionName: 'getLikeList',
  },
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
    const { userId, type } = this._appModule.getRouterParams();
    const { title, functionName } = config[type];
    this._taro.setNavigationBarTitle({ title });
    const requestFunction = ({
      scroll_id,
      limit,
    }: {
      scroll_id: number;
      limit: number;
    }) =>
      this._postModule[functionName]({
        userId: userId as string,
        scroll_id,
        limit,
      });
    this._foc = new BaseFDC<Base.Post>({
      requestFunction,
      onNoMoreData() { },
    });
    this._foc.init();
  };

  @action
  handleScrollToLower = () => {
    this._foc.loadMore();
  };
}
