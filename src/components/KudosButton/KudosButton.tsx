import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import {
  KudosButtonViewModel,
  KudosButtonProps,
} from './KudosButton.ViewModel';
import { FunctionComponent } from 'react';
import './KudosButton.scss';
import { AtIcon } from 'taro-ui';

const KudosButton: FunctionComponent<KudosButtonProps> = observer((props) => {
  const { iconName, handleClick } = useVM(KudosButtonViewModel, props);

  return <AtIcon value={iconName} onClick={handleClick} />;
});

export { KudosButton };
