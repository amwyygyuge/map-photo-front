import {
  CounterController,
  getCounterController,
} from '@/controller/CounterController';
import { computed } from 'mobx';
import { getModule, PROFILE_MODULE, ProfileController } from '@/SDK/index';
import Taro from '@tarojs/taro';

export class ProfiledViewModel {
  _profileModule = getModule<ProfileController>(PROFILE_MODULE);

  constructor() {
    this._profileModule.getUserInfo();
    this._profileModule.getUserPost();
  }

  handleGridClick = () => {
    Taro.navigateTo({ url: 'myPost' });
  };
}
