import './app.scss';
import 'reflect-metadata';
import { FunctionComponent, useEffect } from 'react';
import { initModule } from '@/SDK/index';
import 'taro-ui/dist/style/index.scss';

const App: FunctionComponent = (props) => {
  useEffect(() => {
    initModule();
  }, []);
  return <>{props.children}</>;
};

export default App;
