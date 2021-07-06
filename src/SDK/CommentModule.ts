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

  async likeChildComment(id: number) {
    const res = await requestController.likeChildComment({
      child_comment_id: id,
    });
    return res.data ?? [];
  }

  async unLikeChildComment(id: number) {
    const res = await requestController.unLikeChildComment({
      child_comment_id: id,
    });
    return res.data ?? [];
  }

  async getChildHotsComment(data: API.getHostChildCommentParams) {
    const res = await requestController.getChildHotsComment(data);
    return res.data ?? [];
  }

  createChildComment(data: API.createChildCommentParams) {
    return requestController.createChildComment(data);
  }
}
