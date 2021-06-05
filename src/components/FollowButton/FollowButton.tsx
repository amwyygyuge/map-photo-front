import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import {
  FollowButtonViewModel,
  FollowButtonProps,
} from './FollowButton.ViewModel';
import { FunctionComponent } from 'react';
import './FollowButton.scss';
import { AtButton, AtIcon } from 'taro-ui';

const FollowButton: FunctionComponent<FollowButtonProps> = observer((props) => {
  const { handleClick, isFollowed, isMe, text } = useVM(
    FollowButtonViewModel,
    props,
  );

  if (isMe) {
    return null;
  }
  return (
    <AtButton
      onClick={handleClick}
      type="primary"
      size="small"
      className="follow-button"
    >
      {!isFollowed && <AtIcon value="add" size={18} />}
      {text}
    </AtButton>
  );
});

export { FollowButton };
