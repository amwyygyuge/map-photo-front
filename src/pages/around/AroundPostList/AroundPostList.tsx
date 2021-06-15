import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { AroundPostListViewModel } from './AroundPostList.ViewModel';
import { FunctionComponent } from 'react';
import './AroundPostList.scss';
import { PostListComponent } from '@/components/PostListComponent';

const AroundPostList: FunctionComponent = observer(() => {
  const { handleScrollToLower, dataStatus, data } = useVM(
    AroundPostListViewModel,
    {},
  );

  return (
    <PostListComponent data={data} onScrollToLower={handleScrollToLower} />
  );
});

export { AroundPostList };
