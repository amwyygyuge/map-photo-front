import { View, Image, Text, Swiper, SwiperItem } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { PostDetailViewModel } from './PostDetail.ViewModel';
import { FunctionComponent } from 'react';
import './PostDetail.scss';
import { AtAvatar, AtIcon, AtDivider } from 'taro-ui';
import { KudosButton, KUDOS_TYPE } from '../KudosButton';
import { CommentButton, COMMENT_TYPE } from '../CommentButton';
import { ReportButton } from '../ReportButton';
import { FollowButton } from '../FollowButton';
import { CommentListComponent } from '../CommentListComponent';

const PostDetailComponent: FunctionComponent = observer(() => {
  const { post, photoArray, preViewImage } = useVM(PostDetailViewModel, {});
  if (!post) return null;

  const {
    id,
    user_info: { nickName, avatarUrl, id: userId, does_self_followed },
    created_at,
    comment_count,
    praise_count,
    description,
    does_self_liked,
    user_id,
  } = post;

  return (
    <View className="at-article detail">
      <View className="at-article__h1 detail-user-info">
        <AtAvatar image={avatarUrl} circle size="small" className="avatar" />
        <Text className="user-name">{nickName}</Text>
        {/* <FollowButton userId={userId} isFollowed={does_self_followed} /> */}
      </View>

      <View className="at-article__content">
        <Swiper indicatorDots className="image-swiper">
          {photoArray.map((src) => (
            <SwiperItem key={src}>
              <Image
                className="image"
                mode="scaleToFill"
                src={src}
                onClick={() => preViewImage(src)}
              />
            </SwiperItem>
          ))}
        </Swiper>
        <View>{description}</View>
      </View>

      <View className="at-article__info actions">
        <KudosButton
          id={id}
          isKudos={does_self_liked}
          type={KUDOS_TYPE.POST}
          count={praise_count}
        />
        <CommentButton id={id} type={COMMENT_TYPE.POST} />
        <ReportButton />
      </View>
      <AtDivider content="评论" />
      <CommentListComponent postId={id} ownerId={user_id} />
    </View>
  );
});

export { PostDetailComponent };
