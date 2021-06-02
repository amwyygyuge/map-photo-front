import Taro from '@tarojs/taro';
import { getStore, STORE_KEYS } from '@/utils/index';
import { requestController } from '@/utils/RequestController';

export const PROFILE_MODULE = 'PROFILE_MODULE';

export class ProfileModule {
  appInstance = Taro.getCurrentInstance();

  constructor() {
    this.init();
  }

  async init() {
    if (!getStore<string>(STORE_KEYS.JWT_TOKEN)) {
      await requestController.login();
      await this.updateUserInfo();
    }
  }

  async getUserInfo() {
    const res = await requestController.getUserInfo({
      id: getStore<number>(STORE_KEYS.USER_ID)!,
    });
    return res.data;
  }

  async getUserPost(userId: number) {
    const res = await requestController.getUserPost({
      user_id: parseInt(userId, 10),
      id: -1,
      limit: 100,
    });
    return res.data;
  }

  async updateUserInfo() {
    const { userInfo } = await Taro.getUserInfo();
    return requestController.updateUserInfo({
      ...userInfo,
      id: getStore<number>(STORE_KEYS.USER_ID)!,
    });
  }
}
