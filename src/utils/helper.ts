import Taro from '@tarojs/taro';

const logger = Taro.getRealtimeLogManager();

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum STORE_KEYS {
  JWT_TOKEN = 'JWT_TOKEN',
  USER_ID = 'USER_ID',
}

export const getStore = <T>(key: STORE_KEYS): T | undefined => {
  let val;
  try {
    val = Taro.getStorageSync(key);
  } catch (error) {
    logger.warn(`get ${key} store fail`, error);
  }
  return val;
};

export const setStore = (key: STORE_KEYS, data: any) => {
  try {
    Taro.setStorageSync(key, data);
    return true;
  } catch (error) {
    logger.warn(`set ${key} store fail`, error);
    return false;
  }
};

export const formatStringId = (userId: Base.UserId) =>
  parseInt(`${userId}`, 10);
