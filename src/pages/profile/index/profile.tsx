import { View, Button, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { ProfiledViewModel } from './profile.ViewModel';
import { FunctionComponent } from 'react';
import { RouterTabBar } from '@/components/RouterTabBar';

const Profile: FunctionComponent = observer(() => {
  const vm = useVM<ProfiledViewModel, {}>(ProfiledViewModel, {});
  return (
    <View className="index">
      <Button onClick={vm.counterStore.increment}>+</Button>
      <Button onClick={vm.counterStore.decrement}>-</Button>
      <Button onClick={vm.counterStore.incrementAsync}>Add Async</Button>
      <Text>{vm.counter}</Text>
      <RouterTabBar />
    </View>
  );
});

export { Profile };
