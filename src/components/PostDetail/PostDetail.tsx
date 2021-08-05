import { View, Image, Text, Swiper, SwiperItem } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { PostDetailViewModel } from './PostDetail.ViewModel';
import { FunctionComponent } from 'react';
import './PostDetail.scss';
import { AtAvatar, AtButton, AtDivider } from 'taro-ui';
import { KudosButton, KUDOS_TYPE } from '../KudosButton';
import { CommentButton, COMMENT_TYPE } from '../CommentButton';
import { ReportButton } from '../ReportButton';
import { FollowButton } from '../FollowButton';
import { CommentListComponent } from '../CommentListComponent';
import { type } from '../../pages/profile/PostList/PostList.ViewModel';

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
        <FollowButton userId={userId} isFollowed={does_self_followed} />
      </View>

      <View className="at-article__content detail-content">
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
        <View className="detail-content-container">
          <View className="description">{description}</View>
          <View className="date">
            {created_at}
            <View className="button-container">
              <AtButton type="secondary" circle className="like common-button">
                不喜欢
              </AtButton>
            </View>
          </View>
        </View>
      </View>
      <CommentListComponent postId={id} ownerId={user_id} />
      <View className="comment-input">
        <CommentButton
          id={id}
          type={COMMENT_TYPE.POST}
          count={comment_count}
          render={<View className="input-item">说点什么...</View>}
        />
        <View className="item">
          <KudosButton
            id={id}
            type={KUDOS_TYPE.POST}
            isKudos={does_self_liked}
            count={praise_count}
          />
        </View>
        <View className="item">
          <CommentButton
            id={id}
            type={COMMENT_TYPE.POST}
            count={comment_count}
            disabledClick
          />
        </View>
      </View>
      <View className="fill" />
    </View>
  );
});

export { PostDetailComponent };
