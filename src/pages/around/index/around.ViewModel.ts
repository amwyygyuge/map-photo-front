import { action, computed, observable } from 'mobx';
import Taro from '@tarojs/taro';
import dotIcon from '../../../image/dot.png';
import { getModule, RECOMMEND_MODULE, RecommendController } from '@/SDK/index';

export class AroundViewModel {
  private _mapContext = Taro.createMapContext('mainMap');

  private _recommendController =
    getModule<RecommendController>(RECOMMEND_MODULE);

  constructor() {
    this.init();
  }

  init = async () => {
    await this.getLocation();
    this._recommendController.getUserPost({ ...this.location, scroll_id: -1 });
  };

  handleReload = () => {
    console.log(111);
    Taro.navigateTo({ url: 'sendPost' });
  };

  handleGoToList = () => {
    console.log(222);
  };

  @action
  getLocation = async () => {
    const location = await Taro.getLocation({});
    this.location = location;
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

  @observable
  location = {
    latitude: 0,
    longitude: 0,
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
