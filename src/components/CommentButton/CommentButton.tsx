import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import {
  CommentButtonViewModel,
  CommentButtonProps,
} from './CommentButton.ViewModel';
import { FunctionComponent } from 'react';
import './CommentButton.scss';
import { AtIcon } from 'taro-ui';

const CommentButton: FunctionComponent<CommentButtonProps> = observer(
  (props) => {
    useVM(CommentButtonViewModel, props);

    return <AtIcon value="message" />;
  },
);

export { CommentButton };
