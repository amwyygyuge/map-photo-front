import { View, ScrollView, Text, Image } from '@tarojs/components';
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
    const { posts } = useVM<PostListViewModel, PostListViewModelProps>(
      PostListViewModel,
      props,
    );
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
          <AtCard
            note="点赞数 评论是"
            key={post}
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
        ))}
        <AtCard
          className="post-card"
          note="小Tips"
          extra="额外信息"
          title="这是个标题"
          thumb="http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG"
        >
          任意内容
        </AtCard>
        <AtCard
          className="post-card"
          note="小Tips"
          extra="额外信息"
          title="这是个标题"
          thumb="http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG"
        >
          任意内容
        </AtCard>
        <AtCard
          className="post-card"
          note="小Tips"
          extra="额外信息"
          title="这是个标题"
          thumb="http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG"
        >
          任意内容
        </AtCard>
        <AtCard
          className="post-card"
          note="小Tips"
          extra="额外信息"
          title="这是个标题"
          thumb="http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG"
        >
          任意内容
        </AtCard>
      </ScrollView>
    );
  },
);

export { PostList };
