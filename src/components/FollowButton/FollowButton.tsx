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
  useVM(FollowButtonViewModel, props);

  return (
    <AtButton type="primary" size="small" className="follow-button">
      <AtIcon value="add" size={18} />
      关注
    </AtButton>
  );
});

export { FollowButton };
