import {
  CounterController,
  getCounterController,
} from '@/controller/CounterController';
import { computed, observable } from 'mobx';
import Taro from '@tarojs/taro';

export class AroundViewModel {
  counterStore: CounterController = getCounterController();

  constructor() {
    this.getLocation();
  }

  @computed
  get counter() {
    return this.counterStore.counter;
  }

  handleReload = () => {
    console.log(111);
    Taro.navigateTo({ url: 'sendPost' });
  };

  handleGoToList = () => {
    console.log(222);
  };

  getLocation = async () => {
    const location = await Taro.getLocation({});
    this.location = location;
    console.log(this.location);
  };

  @observable
  location = {
    latitude: 0,
    longitude: 0,
  };

  @observable
  markers = {
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
  };
}
