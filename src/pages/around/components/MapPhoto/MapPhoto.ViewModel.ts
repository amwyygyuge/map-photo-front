import { computed, observable } from 'mobx';
import Taro from '@tarojs/taro';

export class MapPhotoViewModel {
  constructor() {
    this.getLocation();
  }

  getLocation = async () => {
    const location = await Taro.getLocation({});
    this.location = location;
  };

  @observable
  location = {
    latitude: 0,
    longitude: 0,
  };
}
