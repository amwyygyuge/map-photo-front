import { View, Button, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { MyPostViewModel } from './myPost.ViewModel';
import { FunctionComponent } from 'react';
import { RouterTabBar } from '@/components/RouterTabBar';

const MyPost: FunctionComponent = observer(() => {
  const vm = useVM<MyPostViewModel, {}>(MyPostViewModel, {});
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

export { MyPost };
