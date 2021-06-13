import { action, computed, observable, when } from 'mobx';
import dotIcon from '../../../image/dot.png';
import { ViewModelWithModule } from '@/utils/index';
import myLocationIcon from '../../../image/myLocation.png';
import debounce from 'lodash.debounce';

export class AroundViewModel extends ViewModelWithModule {
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
      with: '60rpx',
      height: '60rpx',
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
      height: '60rpx',
      with: '60rpx',
    };
  }

  @observable
  recommendMarker: any[] = [
    {
      id: 1,
      latitude: 24.47951,
      longitude: 118.08948,
      customCallout: {
        display: 'ALWAYS',
      },
      callout: {
        content: '文本内容',
        color: '#ff0000',
        fontSize: 14,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#000000',
        bgColor: '#fff',
        padding: 5,
        display: 'ALWAYS',
        textAlign: 'center',
      },
    },
  ];

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
    when(() => !!this.location.longitude, this.init);
  }

  init = async () => {
    // this.addMyLocation();
    this._recommendController.getRecommendByLocation({
      ...this.location,
      scroll_id: 0,
      limit: 100,
    });
  };

  handleReload = () => {
    this._taro.navigateTo({ url: 'sendPost' });
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
  };

  handleGoToList = () => { };

  handleRegionChange = debounce(
    (e) => {
      if (e.type === 'end') {
        console.log(e);
      }
    },
    1500,
    { trailing: true, leading: false },
  );

  handleMoveToMyLocation = () => {
    this._mapContext.moveToLocation(this.location);
  };
}
