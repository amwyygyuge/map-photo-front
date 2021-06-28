import { View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import { FunctionComponent } from 'react';
import './CommentListComponent.scss';
import { AtAvatar } from 'taro-ui';
import {
  CommentListComponentViewModel,
  CommentListComponentViewModelProps,
} from './CommentListComponent.ViewModel';
import { useVM } from '@/utils/index';
import { KudosButton, KUDOS_TYPE } from '../KudosButton';

const CommentListComponent: FunctionComponent<CommentListComponentViewModelProps> =
  observer((props) => {
    const { hotComments } = useVM(CommentListComponentViewModel, props);

    if (hotComments.length === 0) return <View>暂无数据</View>;

    return (
      <View className="comment-list">
        {hotComments.map((item) => {
          const {
            comment,
            does_self_followed,
            praise_count,
            user: { id, avatarUrl, nickName },
          } = item;
          return (
            <View className="comment-card at-row" key={id}>
              <View className="user-info">
                <AtAvatar
                  circle
                  size="small"
                  text="头像"
                  className="avatar"
                  image={avatarUrl}
                />
                <View className="infos">
                  <Text className="userName">{nickName}</Text>
                  {comment}
                </View>
              </View>
              <View className="actions">
                <KudosButton
                  isKudos={does_self_followed}
                  id={id}
                  type={KUDOS_TYPE.COMMENT}
                />
                {praise_count}
              </View>
            </View>
          );
        })}
      </View>
    );
  });

export { CommentListComponent };
