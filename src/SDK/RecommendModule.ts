import { requestController } from '@/utils/RequestController';

export const RECOMMEND_MODULE = 'RECOMMEND_MODULE';

type Region = {
  northeast: Base.Location;
  southwest: Base.Location;
};
export class RecommendModule {
  async getRecommendByLocation(
    data: {
      region: Region;
    } & Pick<API.getRecommendByLocationParams, 'limit' | 'scroll_id'>,
  ) {
    const _data = {
      scroll_id: `${data.scroll_id}`,
      limit: data.limit,
      ...this._transferLocation(data.region),
    };
    const res = await requestController.getRecommendByLocation(_data);
    return res;
  }

  private _transferLocation(region: Region) {
    const { northeast, southwest } = region;
    const bottom_right = [northeast.latitude, northeast.longitude];
    const top_left = [southwest.latitude, southwest.longitude];
    return { bottom_right, top_left };
  }
}
