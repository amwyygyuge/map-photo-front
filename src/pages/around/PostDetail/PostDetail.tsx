import { observer } from 'mobx-react';
import { FunctionComponent } from 'react';
import { PostDetailComponent } from '@/components/PostDetail';

const PostDetail: FunctionComponent = observer(() => <PostDetailComponent />);

export { PostDetail };
