import { View } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { FollowViewModel } from './Follow.ViewModel';
import { FunctionComponent } from 'react';
import './Follow.scss';

const Follow: FunctionComponent = observer(() => {
  useVM<FollowViewModel, {}>(FollowViewModel, {});

  return <View className="index" />;
});

export { Follow };
