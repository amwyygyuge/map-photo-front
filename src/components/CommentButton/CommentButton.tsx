import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import {
  CommentButtonViewModel,
  CommentButtonProps,
} from './CommentButton.ViewModel';
import { FunctionComponent } from 'react';
import { AtIcon, AtFloatLayout, AtTextarea, AtButton } from 'taro-ui';
import './CommentButton.scss';
import { View } from '@tarojs/components';

const CommentButton: FunctionComponent<CommentButtonProps> = observer(
  (props) => {
    const {
      isOpen,
      handleClick,
      handleInput,
      input,
      handleComment,
      handleClose,
      count,
    } = useVM(CommentButtonViewModel, props);
    const { disabledClick, render } = props;
    return (
      <>
        {!disabledClick && (
          <AtFloatLayout
            isOpened={isOpen}
            onClose={handleClose}
            title="发表评论"
          >
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
        )}
        {render ? (
          <View onClick={handleClick}>{render}</View>
        ) : (
          <>
            <AtIcon value="message" onClick={handleClick} />
            {count}
          </>
        )}
      </>
    );
  },
);

export { CommentButton };
