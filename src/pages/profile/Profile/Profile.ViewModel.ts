import { computed } from 'mobx';
import { getModule, PROFILE_MODULE, ProfileModule } from '@/SDK/index';
import Taro from '@tarojs/taro';
import { getProfileController } from '@/controller/ProfileController';

export class ProfiledViewModel {
  _profileModule = getModule<ProfileModule>(PROFILE_MODULE);

  profileController = getProfileController();

  @computed
  get profile() {
    return this.profileController.profile || {};
  }

  constructor() {
    this._profileModule.getUserInfo();
    this._profileModule.getUserPost();
  }

  handleGridClick = () => {
    Taro.navigateTo({
      url: `PostList?userId=${this.profileController.userId}`,
    });
  };
}
