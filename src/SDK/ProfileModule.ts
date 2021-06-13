import Taro from '@tarojs/taro';
import { getStore, STORE_KEYS } from '@/utils/index';
import { requestController } from '@/utils/RequestController';

export const PROFILE_MODULE = 'PROFILE_MODULE';

type UserId = number | string;

export class ProfileModule {
  appInstance = Taro.getCurrentInstance();

  constructor() {
    this.init();
  }

  isMe(userId: UserId) {
    return getStore<string>(STORE_KEYS.USER_ID) === `${userId}`;
  }

  async init() {
    if (!getStore<string>(STORE_KEYS.JWT_TOKEN)) {
      await requestController.login();
      await this.updateUserInfo();
    }
  }

  async getUserInfo(userId: UserId) {
    const res = await requestController.getUserInfo({
      id: parseInt(`${userId}`, 10),
    });
    return res.data;
  }

  async getUserPost(userId: UserId, id: number, limit: number) {
    const res = await requestController.getUserPost({
      user_id: parseInt(`${userId}`, 10),
      id,
      limit,
    });
    return res.data;
  }

  async getFollows(userId: UserId) {
    const res = await requestController.getFollows({
      follower: parseInt(`${userId}`, 10),
      id: -1,
      limit: 100,
    });
    return res.data;
  }

  async getFans(userId: UserId) {
    const res = await requestController.getFans({
      publisher: parseInt(`${userId}`, 10),
      id: -1,
      limit: 100,
    });
    return res.data;
  }

  async getPostByIds(ids: UserId[]) {
    const _ids = ids.map((id) => parseInt(`${id}`, 10));
    return (await requestController.getPostsByIds({ ids: _ids })).data;
  }

  async updateUserInfo() {
    const { userInfo } = await Taro.getUserInfo();
    return requestController.updateUserInfo(userInfo);
  }

  followUser(userId: UserId) {
    return requestController.followUser({ publisher: userId });
  }

  unFollowUser(userId: UserId) {
    return requestController.unFollowUser({ publisher: userId });
  }
}
