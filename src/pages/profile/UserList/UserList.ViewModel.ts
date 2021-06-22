import { action, computed, observable } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';
import { BaseFDC } from '@/utils/FDC';

export type UserListViewModelViewModelProps = {
  userId: number;
};

const userConfig = {
  follow: {
    title: '我的关注',
    functionName: 'getFollows',
  },
  fans: {
    title: '我的粉丝',
    functionName: 'getFans',
  },
};

export class UserListViewModel extends ViewModelWithModule<UserListViewModelViewModelProps> {
  constructor(props: UserListViewModelViewModelProps) {
    super(props);
    this.init();
  }

  @observable.shallow
  private _FDC: BaseFDC<Base.Follow>;

  @computed
  get data() {
    if (this._FDC) {
      return this._FDC.data;
    }
    return [];
  }

  @action
  init = () => {
    const { userId, userType } = this._appModule.getRouterParams();
    const { title, functionName } = userConfig[userType];
    this._taro.setNavigationBarTitle({ title });
    const requestFunction = ({ index, limit }) =>
      this._profileModule[functionName]({
        userId,
        scroll_id: index,
        limit,
      });
    this._FDC = new BaseFDC({
      requestFunction,
    });
    this._FDC.init();
  };

  @action
  handleScrollToLower = () => {
    this._FDC.loadMore();
  };

  handleAvatarClick = (userId: number) => {
    this._taro.navigateTo({ url: `OtherProfile?userId=${userId}` });
  };
}
