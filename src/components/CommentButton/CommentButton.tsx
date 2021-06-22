import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import {
  CommentButtonViewModel,
  CommentButtonProps,
} from './CommentButton.ViewModel';
import { FunctionComponent } from 'react';
import './CommentButton.scss';
import { AtIcon, AtFloatLayout, AtTextarea, AtButton } from 'taro-ui';

const CommentButton: FunctionComponent<CommentButtonProps> = observer(
  (props) => {
    const {
      isOpen,
      handleClick,
      handleInput,
      input,
      handleComment,
      handleClose,
    } = useVM(CommentButtonViewModel, props);

    return (
      <>
        <AtFloatLayout isOpened={isOpen} onClose={handleClose} title="发表评论">
          <AtTextarea
            placeholder="评论"
            autoFocus
            showConfirmBar
            onChange={handleInput}
            value={input}
            onConfirm={handleComment}
            focus={isOpen}
          />

          <AtButton onClick={handleComment} className="comment-button">
            评论
          </AtButton>
        </AtFloatLayout>
        <AtIcon value="message" onClick={handleClick} />
      </>
    );
  },
);

export { CommentButton };
