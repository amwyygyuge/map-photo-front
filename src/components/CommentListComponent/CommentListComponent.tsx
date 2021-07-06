import { View } from '@tarojs/components';
import { observer } from 'mobx-react';
import { FunctionComponent } from 'react';
import './CommentListComponent.scss';
import {
  CommentListComponentViewModel,
  CommentListComponentViewModelProps,
} from './CommentListComponent.ViewModel';
import { useVM } from '@/utils/index';
import { CommentComponent } from '../CommentComponent';

const CommentListComponent: FunctionComponent<CommentListComponentViewModelProps> =
  observer((props) => {
    const { hotComments } = useVM(CommentListComponentViewModel, props);

    if (hotComments.length === 0) return <View>暂无数据</View>;
    return (
      <View className="comment-list">
        {hotComments.map((item) => (
          <CommentComponent comment={item} key={item.id} />
        ))}
      </View>
    );
  });

export { CommentListComponent };
