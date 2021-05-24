import Taro from '@tarojs/taro';

export const PROFILE_MODULE = 'PROFILE_MODULE';

export class ProfileController {
  constructor() {
    this.init();
  }

  init = async () => {
    const res = await Taro.login();
    console.log(res);
  };
}
