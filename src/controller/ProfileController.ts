import { observable, action } from 'mobx';
import { injectable } from 'inversify';
import { container } from './Container';
import { getModule, PROFILE_MODULE, ProfileModule } from '@/SDK/index';
import Taro from '@tarojs/taro';
import { getStore, STORE_KEYS } from '@/utils/index';

const TAG = Symbol.for('ProfileController');

@injectable()
class ProfileController {
  _profileModule = getModule<ProfileModule>(PROFILE_MODULE);

  @observable
  profile: Taro.UserInfo;

  get userId() {
    return getStore<number>(STORE_KEYS.USER_ID);
  }

  @observable
  location: {
    latitude: number;
    longitude: number;
    address?: string;
    name?: string;
  } = {};

  constructor() {
    this.init();
  }

  init = async () => {
    this._updateUserProfile();
    this._getLocation();
    Taro.onLocationChange(this._updateLocation);
  };

  @action
  private _updateLocation = (res) => {
    this.location = res;
  };

  @action
  private _getLocation = async () => {
    this.location = await Taro.getLocation({ isHighAccuracy: true });
  };

  @action
  private _updateUserProfile = async () => {
    this.profile = await this._profileModule.getUserInfo();
  };
}

container.bind<ProfileController>(TAG).to(ProfileController);
const getProfileController = () => container.get<ProfileController>(TAG);

export { ProfileController, getProfileController };
