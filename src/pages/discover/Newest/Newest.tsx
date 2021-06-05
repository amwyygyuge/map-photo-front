import { View } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { NewestViewModel } from './Newest.ViewModel';
import { FunctionComponent } from 'react';
import './Newest.scss';

const Newest: FunctionComponent = observer(() => {
  useVM(NewestViewModel, {});

  return <View className="index" />;
});

export { Newest };
