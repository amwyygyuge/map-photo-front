import { Navigator, ScrollView, View, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import react, { FunctionComponent, useMemo } from 'react';
import './PostListComponent.scss';
import { AtAvatar, AtIcon } from 'taro-ui';

type PostListComponentProps = {
  onScrollToLower: () => void;
  data: Base.Post[];
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
      {props.description}
      <View className="bottom">
        <View className="user-info">
          <AtAvatar circle size="small" text="头像" className="avatar" />
          用户名
        </View>
        <View className="actions">
          <AtIcon value="heart" size={20} /> {props.praise_count}
        </View>
      </View>
    </View>
  </View>
));

export const PostListComponent: FunctionComponent<PostListComponentProps> =
  observer((props) => {
    const { data, onScrollToLower } = props;
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
      <ScrollView
        className="list"
        scrollY
        scrollWithAnimation
        enableBackToTop
        enableFlex
        refresherBackground="#000"
        onScrollToLower={onScrollToLower}
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
      </ScrollView>
    );
  });
