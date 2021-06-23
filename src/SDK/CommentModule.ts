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
}
