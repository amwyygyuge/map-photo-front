import { action, computed, observable } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';
import { Follow } from '@/utils/RequestType';
import Taro from '@tarojs/taro';

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

  init = async () => {
    const { userId, userType } = this._appModule.getRouterParams();
    const { title, functionName } = userConfig[userType];
    Taro.setNavigationBarTitle({ title });
    this.data = await this._profileModule[functionName](userId);
  };

  @action
  handleScrollToLower = () => {
    this.data = this.data.concat(...this.data);
  };

  @observable.shallow
  data: Follow[] = [];
}
