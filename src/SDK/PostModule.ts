import { requestController } from '@/utils/RequestController';

export const POST_MODULE = 'POST_MODULE';

const formatUserId = (userId: Base.UserId) => parseInt(`${userId}`, 10);

type UserListParams = { userId: Base.UserId } & Pick<
  API.getUserListParams,
  'scroll_id' | 'limit'
>;

export class PostModule {
  async getPostByIds(ids: number[]) {
    return (await requestController.getPostsByIds({ ids })).data;
  }

  async getUserPost(data: UserListParams) {
    const { userId, scroll_id, limit } = data;
    const res = await requestController.getUserPost({
      user_id: formatUserId(userId),
      scroll_id,
      limit,
    });

    return res.data ?? [];
  }

  like(id: number) {
    return requestController.like({ photo_group_id: id });
  }

  unLike(id: number) {
    return requestController.unlike({ photo_group_id: id });
  }
}