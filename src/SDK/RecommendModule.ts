import { requestController } from '@/utils/RequestController';
import { getRecommendByLocationParams } from '@/utils/types';

export const RECOMMEND_MODULE = 'RECOMMEND_MODULE';

export class RecommendModule {
  async getUserPost(data: getRecommendByLocationParams) {
    const res = await requestController.getRecommendByLocation(data);
    return res;
  }
}
