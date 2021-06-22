import { action, computed, observable, when } from 'mobx';
import dotIcon from '../../../image/dot.png';
import { ViewModelWithModule } from '@/utils/index';
import myLocationIcon from '../../../image/myLocation.png';
import debounce from 'lodash.debounce';
import { RecommendFDC } from '@/utils/FDC';
import { MapProps } from '@tarojs/components/types/Map';
import { BaseEventOrig } from '@tarojs/components/types/common';

const transferPostToMark = (posts: Base.PostWithUser[]) => {
  return posts.map((post) => {
    const { cover_photo, id, latitude, longitude } = post;
    return {
      cover_photo,
      id,
      latitude,
      longitude,
      customCallout: { display: 'ALWAYS' },
    };
  });
};

export class AroundViewModel extends ViewModelWithModule {
  @observable.shallow
  private _recommendFDC: RecommendFDC<number>;

  @computed
  get ids() {
    if (this._recommendFDC) {
      return this._recommendFDC.data;
    }
    return [];
  }

  private _mapContext = this._taro.createMapContext('mainMap');

  @observable
  _userTapLocation: Base.Location;

  @computed
  get markers() {
    return [
      ...this.recommendMarker,
      this.myLocationMarker,
      this.userSelectLocationMarker,
    ];
  }

  @computed
  get myLocationMarker() {
    const { latitude, longitude } = this.location;
    return {
      id: 0,
      latitude,
      longitude,
      title: '我的位置',
      iconPath: dotIcon,
      with: 10,
      height: 10,
    };
  }

  @computed
  get userSelectLocationMarker() {
    const { latitude, longitude } = this.location;
    return {
      id: -1,
      latitude,
      longitude,
      title: '所选位置',
      iconPath: myLocationIcon,
      height: 10,
      with: 10,
    };
  }

  @observable.shallow
  recommendMarker: any[] = [];

  @computed
  get location() {
    return this._profileController.location;
  }

  @action
  searchLocation = async () => {
    const { latitude, longitude } = this.userSelectLocationMarker;
    try {
      const result = await this._taro.chooseLocation({
        latitude,
        longitude,
      });
      this.handleMapTab({ detail: result });
    } catch (error) {
      this._logger.info(error);
    }
  };

  constructor() {
    super({});
    when(() => !!this.location.longitude, this.updateFOD);
    this._reaction(
      () => this.ids,
      (ids) => {
        console.log(ids);
        this.fetchData(ids);
      },
      { fireImmediately: true },
    );
  }

  @action
  updateFOD = async () => {
    const region = (await this._mapContext.getRegion()) as Base.Region;
    this._profileController.region = region;
    const requestFunction = ({ scroll_id, limit }) =>
      this._recommendController.getRecommendByLocation({
        region,
        scroll_id,
        limit,
      });
    this._recommendFDC = new RecommendFDC<number>({
      requestFunction,
    });
    this._recommendFDC.init();
  };

  @action
  fetchData = async (ids: number[]) => {
    if (ids.length !== 0) {
      const res = await this._postModule.getPostByIds(ids);
      this.recommendMarker = transferPostToMark(res);
    } else {
      this.recommendMarker = [];
    }
  };

  handleReload = () => {
    this._recommendFDC.nextGroup();
  };

  @action
  handleMapTab = (e) => {
    this._mapContext.translateMarker({
      markerId: -1,
      destination: e.detail,
      duration: 0.5,
      autoRotate: false,
      rotate: 0,
    });
    this._mapContext.moveToLocation(e.detail);
    this.updateFOD();
  };

  handleGoToList = () => {
    const { longitude, latitude } = this.userSelectLocationMarker;
    this._taro.navigateTo({
      url: `AroundPostList`,
    });
  };

  handleRegionChange = debounce(
    (e) => {
      if (e.type === 'end') {
        // TODO
      }
    },
    1500,
    { trailing: true, leading: false },
  );

  handleMoveToMyLocation = () => {
    this._mapContext.moveToLocation(this.location);
  };

  handleCalloutTap = (e: BaseEventOrig<MapProps.onCalloutTapEventDetail>) => {
    const { markerId } = e.detail;
    this._taro.navigateTo({
      url: `PostDetail?postId=${markerId}`,
    });
  };
}
