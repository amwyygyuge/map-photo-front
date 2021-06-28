import { requestController } from '@/utils/RequestController';
import { formatStringId } from '@/utils/index';

export const RECOMMEND_MODULE = 'RECOMMEND_MODULE';

export class RecommendModule {
  async getRecommendByLocation(
    data: {
      region: Base.Region;
    } & Pick<API.getRecommendByLocationParams, 'limit' | 'scroll_id'>,
  ) {
    const _data = {
      scroll_id: `${data.scroll_id}`,
      limit: data.limit,
      ...this._transferLocation(data.region),
    };
    try {
      const res = await requestController.getRecommendByLocation(_data);
      const { list, scroll_id } = res.data;
      return {
        scroll_id,
        list: list ? list : [],
      };
    } catch (error) {
      return {
        scroll_id: '',
        list: [],
      };
    }
  }

  private _transferLocation(region: Base.Region) {
    const { northeast, southwest } = region;
    const bottom_right = [northeast.longitude, southwest.latitude];
    const top_left = [southwest.longitude, northeast.latitude];
    return { bottom_right, top_left };
  }

  async getRecommendGlobal(data: API.getRecommendGlobalParams) {
    const res = await requestController.getRecommendGlobal(data);
    return res.data;
  }

  async getRecommendNew(data: API.getRecommendGlobalParams) {
    const res = await requestController.getRecommendNew(data);
    return res.data;
  }

  async getByPublishers({ limit, scroll_id }: API.getRecommendGlobalParams) {
    const res = await requestController.getByPublishers({
      scroll_id: formatStringId(scroll_id),
      limit,
    });
    return Array.isArray(res.data) ? res.data : [];
  }
}
