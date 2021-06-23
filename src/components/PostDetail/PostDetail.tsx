import { View, Image, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { PostDetailViewModel } from './PostDetail.ViewModel';
import { FunctionComponent } from 'react';
import './PostDetail.scss';
import { AtAvatar, AtIcon, AtDivider, AtMessage } from 'taro-ui';
import { KudosButton } from '../KudosButton';
import { CommentButton } from '../CommentButton';
import { ReportButton } from '../ReportButton';
import { FollowButton } from '../FollowButton';
import { CommentListComponent } from '../CommentListComponent';

const PostDetailComponent: FunctionComponent = observer(() => {
  const { post, photoArray } = useVM(PostDetailViewModel, {});
  if (!post) return null;

  const {
    id,
    user: { nickName, avatarUrl, id: userId },
    created_at,
    comment_count,
    praise_count,
    description,
    does_self_liked,
    user_id,
  } = post;

  return (
    <View className="at-article detail">
      <AtMessage />
      <View className="at-article__h1">
        <AtAvatar image={avatarUrl} circle size="small" />
        <Text className="user-name">{nickName}</Text>
        <FollowButton userId={userId} isFollowed />
      </View>
      <View className="at-article__info sub-title">
        <Text className="time">{created_at}</Text>
        <View className="infos">
          <AtIcon value="heart-2" color="#E93B3D" /> {praise_count}
          <AtIcon value="message" /> {comment_count}
        </View>
      </View>
      <View className="at-article__content">
        <View className="at-article__p">{description}</View>
        <View className="images">
          {photoArray.map((src) => (
            <Image key={src} className="at-article__img" src={src} />
          ))}
        </View>
      </View>

      <View className="at-article__info actions">
        <KudosButton postId={id} isKudos={does_self_liked} />
        <CommentButton postId={id} />
        <ReportButton />
      </View>
      <AtDivider content="评论" />
      <CommentListComponent postId={id} ownerId={user_id} />
    </View>
  );
});

export { PostDetailComponent };
