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
  const { handleClick, isKudos, count } = useVM(KudosButtonViewModel, props);
  if (isKudos) {
    return (
      <>
        <AtIcon value="heart-2" onClick={handleClick} color="#E93B3D" />
        {count}
      </>
    );
  }
  return (
    <>
      <AtIcon value="heart" onClick={handleClick} color="#E93B3D" />
      {count}
    </>
  );
});

export { KudosButton };
