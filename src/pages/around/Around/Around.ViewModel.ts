import { action, computed, observable, when } from 'mobx';
import Taro from '@tarojs/taro';
import dotIcon from '../../../image/dot.png';
import { getModule, RECOMMEND_MODULE, RecommendModule } from '@/SDK/index';
import { getProfileController } from '@/controller/ProfileController';

export class AroundViewModel {
  private _mapContext = Taro.createMapContext('mainMap');

  private _recommendController = getModule<RecommendModule>(RECOMMEND_MODULE);

  private _profileController = getProfileController();

  @computed
  get location() {
    return this._profileController.location;
  }

  constructor() {
    when(() => !!this.location.longitude, this.init);
  }

  init = async () => {
    await this.getLocation();
    this._recommendController.getUserPost({ ...this.location, scroll_id: -1 });
  };

  handleReload = () => {
    Taro.navigateTo({ url: 'sendPost' });
  };

  handleGoToList = () => { };

  @action
  getLocation = () => {
    const { latitude, longitude } = this.location;
    const myLocationMark = {
      id: 0,
      latitude,
      longitude,
      title: '我的位置',
      iconPath: dotIcon,
      with: 20,
      height: 20,
    };
    this.markers = [...this.markers, myLocationMark];
  };

  handleMoveToMyLocation = () => {
    this._mapContext.moveToLocation(this.location);
  };

  @observable.shallow
  markers = [
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
}
