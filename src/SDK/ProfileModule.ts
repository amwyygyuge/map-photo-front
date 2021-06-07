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
      user_id: parseInt(`${userId}`, 10),
      id: -1,
      limit: 100,
    });
    return res.data;
  }

  async getFollows(userId: number) {
    const res = await requestController.getFollows({
      follower: parseInt(`${userId}`, 10),
      id: -1,
      limit: 100,
    });
    return res.data;
  }

  async getFans(userId: number) {
    const res = await requestController.getFans({
      publisher: parseInt(`${userId}`, 10),
      id: -1,
      limit: 100,
    });
    return res.data;
  }

  async getPostByIds(ids: (number | string)[]) {
    const _ids = ids.map((id) => parseInt(`${id}`, 10));
    return (await requestController.getPostsByIds({ ids: _ids })).data;
  }

  async updateUserInfo() {
    const { userInfo } = await Taro.getUserInfo();
    return requestController.updateUserInfo(userInfo);
  }

  followUser(userId: number) {
    return requestController.followUser({ publisher: userId });
  }

  unFollowUser(userId: number) {
    return requestController.unFollowUser({ publisher: userId });
  }
}
