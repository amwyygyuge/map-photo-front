import Taro from '@tarojs/taro';
import { getStore, STORE_KEYS } from '@/utils/index';
import { requestController } from '@/utils/RequestController';

export const PROFILE_MODULE = 'PROFILE_MODULE';

type UserId = number | string;

type UserListParams = { userId: UserId } & Pick<
  API.getUserListParams,
  'id' | 'limit'
>;

const formatUserId = (userId: UserId) => parseInt(`${userId}`, 10);

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
      id: formatUserId(userId),
    });
    return res.data;
  }

  async getUserPost(data: UserListParams) {
    const { userId, id, limit } = data;
    const res = await requestController.getUserPost({
      user_id: formatUserId(userId),
      id,
      limit,
    });
    return res.data;
  }

  async getFollows(data: UserListParams) {
    const { userId, id, limit } = data;
    const res = await requestController.getFollows({
      follower: formatUserId(userId),
      id,
      limit,
    });
    return res.data;
  }

  async getFans(data: UserListParams) {
    const { userId, id, limit } = data;
    const res = await requestController.getFans({
      publisher: formatUserId(userId),
      id,
      limit,
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
    return requestController.followUser({
      publisher: formatUserId(userId),
    });
  }

  unFollowUser(userId: UserId) {
    return requestController.unFollowUser({
      publisher: formatUserId(userId),
    });
  }
}
