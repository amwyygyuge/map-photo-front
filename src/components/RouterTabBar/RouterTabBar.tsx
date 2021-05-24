import { observer } from 'mobx-react';
import { FunctionComponent, useCallback } from 'react';
import { AtTabBar } from 'taro-ui';
import Taro from '@tarojs/taro';
import './RouterTabBar.scss';
import { ROUTER_CONFIG } from '@/config/routerConfig';

export const RouterTabBar: FunctionComponent = observer(() => {
  const handleClick = useCallback((index: number) => {
    const url = ROUTER_CONFIG[index].url;
    Taro.redirectTo({
      url,
    });
  }, []);
  return (
    <AtTabBar fixed tabList={ROUTER_CONFIG} onClick={handleClick} current={0} />
  );
});
