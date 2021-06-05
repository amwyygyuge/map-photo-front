import { View } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { HotSpotViewModel } from './HotSpot.ViewModel';
import { FunctionComponent } from 'react';
import './HotSpot.scss';

const HotSpot: FunctionComponent = observer(() => {
  useVM(HotSpotViewModel, {});

  return <View className="index" />;
});

export { HotSpot };
