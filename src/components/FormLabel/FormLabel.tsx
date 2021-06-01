import { FunctionComponent } from 'react';
import { View, Text } from '@tarojs/components';
import './FormLabel.scss';

export const FormLabel: FunctionComponent<{ label: string }> = (props) => {
  return (
    <View className="form-Label-container">
      <Text className="form-Label">{props.label}</Text>
      {props.children}
    </View>
  );
};
