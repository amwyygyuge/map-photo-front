import './app.scss';
import 'reflect-metadata';
import { FunctionComponent, useEffect } from 'react';
import { initModule } from '@/SDK/index';
import 'taro-ui/dist/style/index.scss';
import Taro from '@tarojs/taro';

const App: FunctionComponent = (props) => {
  useEffect(() => {
    Taro.cloud.init({
      env: 'testing-5g65b9i2e503e641',
    });
    initModule();
  }, []);
  return <>{props.children}</>;
};

export default App;
