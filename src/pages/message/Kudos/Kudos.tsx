import { View } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { KudosViewModel } from './Kudos.ViewModel';
import { FunctionComponent } from 'react';
import './Kudos.scss';

const Kudos: FunctionComponent = observer(() => {
  useVM<KudosViewModel, {}>(KudosViewModel, {});

  return <View className="index" />;
});

export { Kudos };
