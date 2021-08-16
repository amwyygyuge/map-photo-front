import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import {
  CommentComponentViewModel,
  CommentComponentProps,
} from './CommentComponent.ViewModel';
import { FunctionComponent } from 'react';
import { View, Text } from '@tarojs/components';
import { KudosButton, KUDOS_TYPE } from '../KudosButton';
import { CommentButton, COMMENT_TYPE } from '../CommentButton';
import { AtAvatar } from 'taro-ui';
import './CommentComponent.scss';

const CommentComponent: FunctionComponent<CommentComponentProps> = observer(
  (props) => {
    const {
      id,
      comment,
      does_self_liked,
      praise_count,
      user: { avatarUrl, nickName },
      created_at,
    } = props.comment;

    const { hotComments } = useVM(CommentComponentViewModel, props);

    return (
      <>
        <View className="comment-card">
          <View className="user-info">
            <AtAvatar
              circle
              size="small"
              text="头像"
              className="avatar"
              image={avatarUrl}
            />
            <Text className="userName">{nickName}</Text>
            <View className="comment-card-actions">
              <KudosButton
                isKudos={does_self_liked}
                id={id}
                type={KUDOS_TYPE.COMMENT}
                count={praise_count}
                size={18}
              />

              <CommentButton size={18} id={id} type={COMMENT_TYPE.COMMENT} />
            </View>
          </View>
          <Text className="comment">{comment}</Text>
          <Text className="date">{created_at}</Text>
        </View>

        {hotComments.map((item) => {
          return (
            <View className="comment-card child-comment" key={item.id}>
              <View className="user-info">
                <AtAvatar
                  circle
                  size="small"
                  text="头像"
                  className="avatar"
                  image={item.from_user.avatarUrl}
                />
                <Text className="userName">{item.from_user.nickName}</Text>
                <View className="comment-card-actions">
                  <KudosButton
                    isKudos={item.does_self_liked}
                    id={item.id}
                    type={KUDOS_TYPE.CHILD_COMMENT}
                    count={item.praise_count}
                    size={18}
                  />
                </View>
              </View>
              <Text className="comment">{item.comment}</Text>
              <Text className="date">{item.created_at}</Text>
            </View>
          );
        })}
      </>
    );
  },
);

export { CommentComponent };
