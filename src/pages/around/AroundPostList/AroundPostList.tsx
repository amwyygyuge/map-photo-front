import { View } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { AroundPostListViewModel } from './AroundPostList.ViewModel';
import { FunctionComponent } from 'react';
import './AroundPostList.scss';

const AroundPostList: FunctionComponent = observer(() => {
  useVM(AroundPostListViewModel, {});

  return <View className="index" />;
});

export { AroundPostList };
