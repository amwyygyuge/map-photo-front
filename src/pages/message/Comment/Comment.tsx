import { View } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { CommentViewModel } from './Comment.ViewModel';
import { FunctionComponent } from 'react';
import './Comment.scss';

const Comment: FunctionComponent = observer(() => {
  useVM(CommentViewModel, {});

  return <View className="index" />;
});

export { Comment };
