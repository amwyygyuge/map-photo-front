import { requestController } from '@/utils/RequestController';
import Taro from '@tarojs/taro';

export const NOTIFY_MODULE = 'NOTIFY_MODULE';

export class NotifyModule {
  constructor() {
    this.updateNotify();
  }

  async updateNotify() {
    const res = await requestController.hasUnRead();
    if (res.data) {
      Taro.setTabBarBadge({
        index: 3,
        text: '*',
      });
    }
  }

  async getUnRead(data: API.ListParam) {
    const res = await requestController.getUnRead(data);
    return res.data ?? [];
  }
}
