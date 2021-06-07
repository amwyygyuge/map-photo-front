import { computed } from 'mobx';
import Taro from '@tarojs/taro';
import { ViewModelWithModule } from '@/utils/index';

export class ProfiledViewModel extends ViewModelWithModule {
  @computed
  get profile() {
    return this._profileController.profile || {};
  }

  constructor() {
    super({});
    this._profileModule.getUserInfo();
  }

  handleGridClick = (item) => {
    const url = `${item.url}&userId=${this._profileController.userId}`;
    Taro.navigateTo({
      url,
    });
  };
}
