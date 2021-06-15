import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import {
  PostListViewModel,
  PostListViewModelProps,
} from './PostList.ViewModel';
import { FunctionComponent } from 'react';
import './PostList.scss';
import { PostListComponent } from '@/components/PostListComponent';

const PostList: FunctionComponent<PostListViewModelProps> = observer(
  (props) => {
    const { handleScrollToLower, dataStatus, data } = useVM(
      PostListViewModel,
      props,
    );

    return (
      <PostListComponent data={data} onScrollToLower={handleScrollToLower} />
    );
  },
);

export { PostList };
