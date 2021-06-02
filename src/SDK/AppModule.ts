import Taro from '@tarojs/taro';

export const APP_MODULE = 'APP_MODULE';

export class AppModule {
  appInstance = Taro.getCurrentInstance();

  getRouterParams() {
    return this.appInstance.router?.params;
  }
}
