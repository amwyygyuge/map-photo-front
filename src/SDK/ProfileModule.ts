import Taro from '@tarojs/taro';
import { getStore, STORE_KEYS } from '@/utils/index';
import { requestController } from '@/utils/RequestController';

export const PROFILE_MODULE = 'PROFILE_MODULE';

type UserListParams = { userId: Base.UserId } & Pick<
  API.getUserListParams,
  'scroll_id' | 'limit'
>;

const formatUserId = (userId: Base.UserId) => parseInt(`${userId}`, 10);

export class ProfileModule {
  constructor() {
    this.init();
  }

  isMe(userId: Base.UserId) {
    return getStore<string>(STORE_KEYS.USER_ID) === `${userId}`;
  }

  async init() {
    if (!getStore<string>(STORE_KEYS.JWT_TOKEN)) {
      await requestController.login();
      await this.updateUserInfo();
    }
  }

  async getUserInfo(userId: Base.UserId) {
    const res = await requestController.getUserInfo({
      id: formatUserId(userId),
    });
    return res.data;
  }

  async getFollows(data: UserListParams) {
    const { userId, scroll_id, limit } = data;
    const res = await requestController.getFollows({
      follower: formatUserId(userId),
      scroll_id,
      limit,
    });
    return res.data ?? [];
  }

  async getFans(data: UserListParams) {
    const { userId, scroll_id, limit } = data;
    const res = await requestController.getFans({
      publisher: formatUserId(userId),
      scroll_id,
      limit,
    });
    return res.data ?? [];
  }

  async updateUserInfo() {
    const { userInfo } = await Taro.getUserInfo();
    return requestController.updateUserInfo(userInfo);
  }

  followUser(userId: Base.UserId) {
    return requestController.followUser({
      publisher: formatUserId(userId),
    });
  }

  unFollowUser(userId: Base.UserId) {
    return requestController.unFollowUser({
      publisher: formatUserId(userId),
    });
  }
}
