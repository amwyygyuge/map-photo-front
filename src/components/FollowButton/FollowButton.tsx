import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import {
  FollowButtonViewModel,
  FollowButtonProps,
} from './FollowButton.ViewModel';
import { FunctionComponent } from 'react';
import './FollowButton.scss';
import { AtButton } from 'taro-ui';

const FollowButton: FunctionComponent<FollowButtonProps> = observer((props) => {
  const { handleClick, isMe, text } = useVM(FollowButtonViewModel, props);

  if (isMe) {
    return null;
  }
  return (
    <AtButton
      onClick={handleClick}
      type="secondary"
      circle
      size="small"
      className="follow-button common-button"
    >
      {text}
    </AtButton>
  );
});

export { FollowButton };
