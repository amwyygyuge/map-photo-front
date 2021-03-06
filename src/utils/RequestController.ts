import Taro from '@tarojs/taro';
import { getStore, STORE_KEYS, setStore } from './helper';
import { DOMAIN } from '@/config/domain.config';

const logger = Taro.getRealtimeLogManager();

enum BACKEND_ROUTER {
  LOGIN = '/ug/user/wechat_login',
  UPDATE_USER_INFO = '/ag/user/update_wechat_info',
  GET_USER_INFO = '/ag/user/get_by_id',
  PRE_CREATE = '/ag/photo/group/create',
  CREATE_POST = '/ag/photo/group/update',
  GET_USER_POST = '/ag/photo/group/get_by_user',
  GET_RECOMMEND_BY_LOCATION = '/ag/photo/recommend/geo',
  GET_RECOMMEND_GLOBAL = '/ag/photo/recommend/global',
  GET_RECOMMEND_NEW = '/ag/photo/recommend/new',
  FOLLOW = '/ag/user/attention',
  UN_FOLLOW = '/ag/user/un_attention',
  GET_FOLLOWS = '/ag/user/get_publishers',
  GET_FANS = '/ag/user/get_fans',
  GET_POST_BY_IDS = '/ag/photo/group/get_by_ids',
  LIKE = '/ag/photo/group/like',
  UN_LIKE = '/ag/photo/group/un_like',
  CREATE_COMMENT = '/ag/photo/group/comment/create',
  GET_HOST_COMMENT = '/ag/photo/group/comment/get_hots',
  GET_OTHERS_COMMENT = '/ag/photo/group/comment/get_others',
  LIKE_COMMENT = '/ag/photo/group/comment/like',
  UN_LIKE_COMMENT = '/ag/photo/group/comment/un_like',
  GET_BY_PUBLISHERS = '/ag/photo/group/get_by_publishers',
  CREATE_CHILD_COMMENT = '/ag/photo/group/comment/child/create',
  GET_CHILD_HOST_COMMENT = '/ag/photo/group/comment/child/get_hots',
  LIKE_CHILD_COMMENT = '/ag/photo/group/comment/child/like',
  UN_LIKE_CHILD_COMMENT = '/ag/photo/group/comment/child/un_like',
  GET_KIKE_LIST = '/ag/photo/group/get_like_list',
  HAS_UN_READ = '/ag/notify/has_un_read',
  GET_UN_READ = '/ag/notify/list',
  READ_NOTIFY = '/ag/notify/read_all',
  GET_NOTIFY_TYPE = '/ag/notify/type/list',
}

enum STATUS_CODE {
  NEED_LOGIN = 401,
  SUCCESS = 200,
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
      return Taro.request<Base.Result<T>>(options);
    };

    try {
      let result = await doRequest();
      if (result.statusCode === STATUS_CODE.NEED_LOGIN) {
        await this.login();
        result = await doRequest();
      }
      if (result.statusCode !== STATUS_CODE.SUCCESS) {
        logger.warn(url, result.data.message);
        throw new Error(result.data.message);
      }
      return result.data;
    } catch (error) {
      logger.warn(`${DOMAIN}${url} request fail`);
      throw new Error(error);
    }
  }

  updateUserInfo(data: Taro.UserInfo) {
    return this.request<API.updateUserInfoReturn>({
      url: BACKEND_ROUTER.UPDATE_USER_INFO,
      data,
    });
  }

  preCreate() {
    return this.request<API.preCreateReturn>({
      url: BACKEND_ROUTER.PRE_CREATE,
    });
  }

  createPost(data: API.createPostParams) {
    return this.request<API.createPostReturn>({
      url: BACKEND_ROUTER.CREATE_POST,
      data,
    });
  }

  getByPublishers(data: API.ListParam) {
    return this.request<API.createPostReturn>({
      url: BACKEND_ROUTER.GET_BY_PUBLISHERS,
      data,
    });
  }

  getUserPost(data: API.ListParam & { user_id: number }) {
    return this.request<Base.Post[]>({
      url: BACKEND_ROUTER.GET_USER_POST,
      data,
    });
  }

  getPostsByIds(data: API.getPostsByIdsParams) {
    return this.request<Base.PostWithUser[]>({
      url: BACKEND_ROUTER.GET_POST_BY_IDS,
      data,
    });
  }

  getUserInfo(data: API.getUserInfoParams) {
    return this.request<Base.User>({
      url: BACKEND_ROUTER.GET_USER_INFO,
      data,
    });
  }

  getRecommendByLocation(data: API.getRecommendByLocationParams) {
    return this.request<API.RecommendReturn>({
      url: BACKEND_ROUTER.GET_RECOMMEND_BY_LOCATION,
      data,
    });
  }

  getRecommendGlobal(data: API.getRecommendGlobalParams) {
    return this.request<API.RecommendReturn>({
      url: BACKEND_ROUTER.GET_RECOMMEND_GLOBAL,
      data,
    });
  }

  getRecommendNew(data: API.getRecommendGlobalParams) {
    return this.request<API.RecommendReturn>({
      url: BACKEND_ROUTER.GET_RECOMMEND_NEW,
      data,
    });
  }

  followUser(data: API.FollowParams) {
    return this.request<Base.Post[]>({
      url: BACKEND_ROUTER.FOLLOW,
      data,
    });
  }

  unFollowUser(data: API.FollowParams) {
    return this.request<Base.Post[]>({
      url: BACKEND_ROUTER.UN_FOLLOW,
      data,
    });
  }

  like(data: API.LikeParams) {
    return this.request<Base.Post[]>({
      url: BACKEND_ROUTER.LIKE,
      data,
    });
  }

  unlike(data: API.LikeParams) {
    return this.request<Base.Post[]>({
      url: BACKEND_ROUTER.UN_LIKE,
      data,
    });
  }

  getFollows(data: API.ListParam & { follower: number }) {
    return this.request<Base.Follow[]>({
      url: BACKEND_ROUTER.GET_FOLLOWS,
      data,
    });
  }

  getFans(data: API.ListParam & { publisher: number }) {
    return this.request<Base.Post[]>({
      url: BACKEND_ROUTER.GET_FANS,
      data,
    });
  }

  createComment(data: API.createCommentParams) {
    return this.request<Base.Post[]>({
      url: BACKEND_ROUTER.CREATE_COMMENT,
      data,
    });
  }

  createChildComment(data: API.createChildCommentParams) {
    return this.request<Base.Post[]>({
      url: BACKEND_ROUTER.CREATE_CHILD_COMMENT,
      data,
    });
  }

  getHotsComment(data: API.getHotsCommentParams) {
    return this.request<Base.Comment[]>({
      url: BACKEND_ROUTER.GET_HOST_COMMENT,
      data,
    });
  }

  getOthersComment(data: API.getOthersCommentParams) {
    return this.request<Base.Comment[]>({
      url: BACKEND_ROUTER.GET_OTHERS_COMMENT,
      data,
    });
  }

  likeComment(data: API.CommentId) {
    return this.request<Base.Post[]>({
      url: BACKEND_ROUTER.LIKE_COMMENT,
      data,
    });
  }

  unLikeComment(data: API.CommentId) {
    return this.request<Base.Post[]>({
      url: BACKEND_ROUTER.UN_LIKE_COMMENT,
      data,
    });
  }

  likeChildComment(data: API.ChildCommentId) {
    return this.request<Base.Post[]>({
      url: BACKEND_ROUTER.LIKE_CHILD_COMMENT,
      data,
    });
  }

  unLikeChildComment(data: API.ChildCommentId) {
    return this.request<Base.Post[]>({
      url: BACKEND_ROUTER.UN_LIKE_CHILD_COMMENT,
      data,
    });
  }

  getChildHotsComment(data: API.getHostChildCommentParams) {
    return this.request<Base.ChildComment[]>({
      url: BACKEND_ROUTER.GET_CHILD_HOST_COMMENT,
      data,
    });
  }

  getLikeList(data: API.ListParam) {
    return this.request<Base.Post[]>({
      url: BACKEND_ROUTER.GET_KIKE_LIST,
      data,
    });
  }

  hasUnRead() {
    return this.request<Boolean>({
      url: BACKEND_ROUTER.HAS_UN_READ,
      data: {},
    });
  }

  getUnRead(data: API.ListParam) {
    return this.request<Base.Notify[]>({
      url: BACKEND_ROUTER.GET_UN_READ,
      data,
    });
  }

  readAll() {
    return this.request<Base.Post[]>({
      url: BACKEND_ROUTER.READ_NOTIFY,
    });
  }

  getNotifyType() {
    return this.request<Base.Post[]>({
      url: BACKEND_ROUTER.GET_NOTIFY_TYPE,
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
