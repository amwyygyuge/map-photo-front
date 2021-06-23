import { FunctionComponent, useEffect } from 'react';
import { initModule } from '@/SDK/index';
import Taro from '@tarojs/taro';
import './app.scss';

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
