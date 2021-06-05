import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { PostDetailViewModel } from './PostDetail.ViewModel';
import { FunctionComponent } from 'react';
import './PostDetail.scss';
import { PostDetailComponent } from '@/components/PostDetail';

const PostDetail: FunctionComponent = observer(() => {
  const { post } = useVM(PostDetailViewModel, {});
  if (!post) return null;
  return <PostDetailComponent post={post} />;
});

export { PostDetail };
