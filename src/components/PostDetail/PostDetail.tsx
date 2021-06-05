import { View, Image, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { PostDetailViewModel, PostDetailProps } from './PostDetail.ViewModel';
import { FunctionComponent, useMemo } from 'react';
import './PostDetail.scss';
import { AtAvatar, AtIcon, AtDivider } from 'taro-ui';
import { KudosButton } from '../KudosButton';
import { CommentButton } from '../CommentButton';
import { ReportButton } from '../ReportButton';
import { FollowButton } from '../FollowButton';

const PostDetailComponent: FunctionComponent<PostDetailProps> = observer(
  (props) => {
    useVM(PostDetailViewModel, props);
    const { post } = props;
    const {
      user: { nickName, avatarUrl },
      created_at,
      comment_count,
      praise_count,
      description,
      photos,
    } = post;
    const photoArray = useMemo(() => photos.split(','), [photos]);
    return (
      <View className="at-article detail">
        <View className="at-article__h1">
          <AtAvatar image={avatarUrl} circle size="small" />
          <Text className="user-name">{nickName}</Text>
          <FollowButton />
        </View>
        <View className="at-article__info sub-title">
          <Text className="time">{created_at}</Text>
          <View className="infos">
            <AtIcon value="heart-2" /> {praise_count}
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
          <KudosButton postId={11} isKudos={false} />
          <CommentButton />
          <ReportButton />
        </View>
        <AtDivider content="评论" />
      </View>
    );
  },
);

export { PostDetailComponent };
