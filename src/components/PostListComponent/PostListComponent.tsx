import { Navigator, View, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import react, { FunctionComponent, useMemo } from 'react';
import './PostListComponent.scss';
import { AtAvatar, AtIcon } from 'taro-ui';
import { ScrollViewComponent } from '../ScrollView';

type PostListComponentProps = {
  onScrollToLower: () => void;
  data: Base.Post[];
  onRefresherRefresh: () => Promise<boolean>;
};

const Post = react.memo((props: Base.Post) => (
  <View className="post-card">
    <Image
      className="coverPhoto"
      src={props.cover_photo}
      showMenuByLongpress
      lazyLoad
      mode="widthFix"
    />
    <View className="info">
      <View className="user-info">
        <AtAvatar circle size="small" text="头像" className="avatar" />
        {props.user_info.nickName}
        <View className="actions">
          {props.does_self_liked ? (
            <AtIcon value="heart-2" size="24rpx" color="#E93B3D" />
          ) : (
            <AtIcon value="heart" size="24rpx" color="#E93B3D" />
          )}
          {props.praise_count}
        </View>
      </View>
      <View className="description">{props.description}</View>
    </View>
  </View>
));

export const PostListComponent: FunctionComponent<PostListComponentProps> =
  observer((props) => {
    const { data, onScrollToLower, onRefresherRefresh } = props;

    const [column1, column2] = useMemo(() => {
      const _column1: Base.Post[] = [];
      const _column2: Base.Post[] = [];
      for (let i = 0; i < data.length; i++) {
        if (i % 2 === 1) {
          _column1.push(data[i]);
        } else {
          _column2.push(data[i]);
        }
      }
      return [_column1, _column2];
    }, [data]);

    return (
      <ScrollViewComponent
        className="post-list"
        enableFlex
        onScrollToLower={onScrollToLower}
        onRefresherRefresh={onRefresherRefresh}
        data={data}
      >
        <View className="column">
          {column1.map((post) => (
            <Navigator key={post.id} url={`PostDetail?postId=${post.id}`}>
              <Post {...post} />
            </Navigator>
          ))}
        </View>
        <View className="column">
          {column2.map((post) => (
            <Navigator key={post.id} url={`PostDetail?postId=${post.id}`}>
              <Post {...post} />
            </Navigator>
          ))}
        </View>
      </ScrollViewComponent>
    );
  });
