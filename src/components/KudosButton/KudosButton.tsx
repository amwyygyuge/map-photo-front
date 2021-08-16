import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import {
  KudosButtonViewModel,
  KudosButtonProps,
} from './KudosButton.ViewModel';
import { FunctionComponent } from 'react';
import './KudosButton.scss';
import { AtIcon } from 'taro-ui';
import { Text, View } from '@tarojs/components';

const KudosButton: FunctionComponent<KudosButtonProps> = observer((props) => {
  const { handleClick, isKudos, count } = useVM(KudosButtonViewModel, props);
  const { size } = props;
  if (isKudos) {
    return (
      <View className="kudos-container">
        <AtIcon
          size={size}
          value="heart-2"
          onClick={handleClick}
          color="#E93B3D"
        />
        <Text>{count}</Text>
      </View>
    );
  }
  return (
    <View className="kudos-container">
      <AtIcon size={size} value="heart" onClick={handleClick} color="#E93B3D" />
      <Text>{count}</Text>
    </View>
  );
});

export { KudosButton };
