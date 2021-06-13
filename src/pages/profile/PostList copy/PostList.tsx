import { Navigator, ScrollView, View, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import {
  PostListViewModel,
  PostListViewModelProps,
} from './PostList.ViewModel';
import { FunctionComponent } from 'react';
import './PostList.scss';
import { AtAvatar, AtIcon } from 'taro-ui';

const PostList: FunctionComponent<PostListViewModelProps> = observer(
  (props) => {
    const { column2, column1, handleScrollToLower } = useVM(
      PostListViewModel,
      props,
    );
    return (
      <ScrollView
        className="list"
        scrollY
        scrollWithAnimation
        enableBackToTop
        enableFlex
        refresherBackground="#000"
        onScrollToLower={handleScrollToLower}
      >
        <View className="column">
          {column1.map((post) => (
            <Navigator key={post.id} url={`PostDetail?postId=${post.id}`}>
              <View className="post-card">
                <Image
                  className="coverPhoto"
                  src={post.cover_photo}
                  showMenuByLongpress
                  lazyLoad
                  mode="widthFix"
                />
                <View className="info">
                  {post.description}
                  <View className="bottom">
                    <View className="user-info">
                      <AtAvatar
                        circle
                        size="small"
                        text="头像"
                        className="avatar"
                      />
                      用户名
                    </View>
                    <View className="actions">
                      <AtIcon value="heart" size={20} /> {post.praise_count}
                    </View>
                  </View>
                </View>
              </View>
            </Navigator>
          ))}
        </View>
        <View className="column">
          {column2.map((post) => (
            <Navigator key={post.id} url={`PostDetail?postId=${post.id}`}>
              <View className="post-card">
                <Image
                  className="coverPhoto"
                  src={post.cover_photo}
                  showMenuByLongpress
                  lazyLoad
                  mode="widthFix"
                />
                <View className="info">
                  {post.description}
                  <View className="bottom">
                    <View className="user-info">
                      <AtAvatar
                        circle
                        size="small"
                        text="头像"
                        className="avatar"
                      />
                      用户名
                    </View>
                    <View className="actions">
                      <AtIcon value="heart" size={20} /> {post.praise_count}
                    </View>
                  </View>
                </View>
              </View>
            </Navigator>
          ))}
        </View>
      </ScrollView>
    );
  },
);

export { PostList };
