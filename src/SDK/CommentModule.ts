import { requestController } from '@/utils/RequestController';

export const COMMENT_MODULE = 'COMMENT_MODULE';

export class CommentModule {
  createComment(data: API.createCommentParams) {
    return requestController.createComment(data);
  }

  async getHotsComment(data: API.getHotsCommentParams) {
    const res = await requestController.getHotsComment(data);
    return res.data ?? [];
  }

  async like(id: number) {
    const res = await requestController.likeComment({ comment_id: id });
    return res.data ?? [];
  }

  async unLike(id: number) {
    const res = await requestController.unLikeComment({ comment_id: id });
    return res.data ?? [];
  }
}
