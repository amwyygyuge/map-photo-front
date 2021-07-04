import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import {
  CommentComponentViewModel,
  CommentComponentProps,
} from './CommentComponent.ViewModel';
import { FunctionComponent } from 'react';
import { AtIcon } from 'taro-ui';

const CommentComponent: FunctionComponent<CommentComponentProps> = observer(
  (props) => {
    const { handleClick, isKudos } = useVM(CommentComponentViewModel, props);
    if (isKudos) {
      return <AtIcon value="heart-2" onClick={handleClick} color="#E93B3D" />;
    }
    return <AtIcon value="heart" onClick={handleClick} color="#E93B3D" />;
  },
);

export { CommentComponent };
