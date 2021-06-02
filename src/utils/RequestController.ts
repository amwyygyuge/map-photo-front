import Taro from '@tarojs/taro';
import { getStore, STORE_KEYS, setStore } from './helper';
import { DOMAIN } from '@/config/domain.config';
import {
  updateUserInfoReturn,
  preCreateReturn,
  createPostParams,
  createPostReturn,
  getRecommendByLocationParams,
  getUserPostParams,
  getRecommendGlobalParams,
  getUserInfoParams,
} from './types';

const logger = Taro.getRealtimeLogManager();

interface Result<T> {
  code: number;
  message: string;
  data: T;
}

enum BACKEND_ROUTER {
  LOGIN = '/ug/user/wechat_login',
  UPDATE_USER_INFO = '/ag/user/update_wechat_info',
  GET_USER_INFO = '/ag/user/get_by_id',
  PRE_CREATE = '/ag/photo/group/create',
  CREATE_POST = '/ag/photo/group/update',
  GET_USER_POST = '/ag/photo/group/get_by_user',
  GET_RECOMMEND_BY_LOCATION = '/ag/photo/recommend/geo',
  GET_RECOMMEND_GLOBAL = '/ag/photo/recommend/global',
}

enum STATUS_CODE {
  NEED_LOGIN = 401,
}

class RequestController {
  userId = getStore<number>(STORE_KEYS.USER_ID);

  jwtToken = getStore<string>(STORE_KEYS.JWT_TOKEN);

  domain = DOMAIN;

  async request<T>(options: Taro.request.Option) {
    const { url, header } = options;
    Object.assign(options, {
      url: `${DOMAIN}${url}`,
      header: {
        ...header,
        Authorization: this.jwtToken,
      },
      method: 'POST',
    });
    const doRequest = () => {
      Object.assign(options.header, { Authorization: this.jwtToken });
      return Taro.request<Result<T>>(options);
    };
    try {
      let result = await doRequest();
      if (result.statusCode === STATUS_CODE.NEED_LOGIN) {
        await this.login();
        result = await doRequest();
      }
      return result.data;
    } catch (error) {
      logger.warn(`${DOMAIN}${url} request fail`);
      throw new Error(error);
    }
  }

  updateUserInfo(data: Taro.UserInfo) {
    return this.request<updateUserInfoReturn>({
      url: BACKEND_ROUTER.UPDATE_USER_INFO,
      data,
    });
  }

  preCreate() {
    return this.request<preCreateReturn>({
      url: BACKEND_ROUTER.PRE_CREATE,
    });
  }

  createPost(data: createPostParams) {
    return this.request<createPostReturn>({
      url: BACKEND_ROUTER.CREATE_POST,
      data,
    });
  }

  getUserPost(data: getUserPostParams) {
    return this.request<createPostReturn>({
      url: BACKEND_ROUTER.GET_USER_POST,
      data,
    });
  }

  getUserInfo(data: getUserInfoParams) {
    return this.request<createPostReturn>({
      url: BACKEND_ROUTER.GET_USER_INFO,
      data,
    });
  }

  getRecommendByLocation(data: getRecommendByLocationParams) {
    return this.request<createPostReturn>({
      url: BACKEND_ROUTER.GET_RECOMMEND_BY_LOCATION,
      data,
    });
  }

  getRecommendGlobal(data: getRecommendGlobalParams) {
    return this.request<createPostReturn>({
      url: BACKEND_ROUTER.GET_RECOMMEND_GLOBAL,
      data,
    });
  }

  async login() {
    const { code } = await Taro.login();
    const { data } = await this.request<{
      jwt_token: string;
      user_id: number;
    }>({
      url: BACKEND_ROUTER.LOGIN,
      data: { code },
    });
    setStore(STORE_KEYS.JWT_TOKEN, data.jwt_token);
    setStore(STORE_KEYS.USER_ID, data.user_id);

    this.jwtToken = data.jwt_token;
    this.userId = data.user_id;

    return true;
  }
}

const requestController = new RequestController();
export { requestController };