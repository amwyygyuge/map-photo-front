import { Navigator, ScrollView, Text, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import {
  PostListViewModel,
  PostListViewModelProps,
} from './PostList.ViewModel';
import { FunctionComponent } from 'react';
import { AtCard } from 'taro-ui';
import './PostList.scss';

const PostList: FunctionComponent<PostListViewModelProps> = observer(
  (props) => {
    const { posts } = useVM(PostListViewModel, props);
    return (
      <ScrollView
        className="list"
        scrollY
        scrollWithAnimation
        enableBackToTop
        refresherBackground="#000"
        onScrollToLower={() => console.log(111)}
      >
        {posts.map((post) => (
          <Navigator key={post.id} url={`PostDetail?postId=${post.id}`}>
            <AtCard
              note="点赞数 评论是"
              className="post-card"
              title={post.description}
            >
              <Image
                className="coverPhoto"
                src={post.cover_photo}
                showMenuByLongpress
              />
              任意内容
            </AtCard>
          </Navigator>
        ))}
      </ScrollView>
    );
  },
);

export { PostList };
