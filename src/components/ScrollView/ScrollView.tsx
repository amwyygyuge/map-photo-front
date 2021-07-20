import { ScrollView, View } from '@tarojs/components';
import { ScrollViewProps } from '@tarojs/components/types/ScrollView';
import { observer } from 'mobx-react';
import { FunctionComponent } from 'react';
import { useRefresherTriggered } from '../hooks';
import { CommonEventFunction } from '@tarojs/components/types/common';

type ScrollViewComponentProps = {
  data: any[];
  onScrollToLower: CommonEventFunction;
  onRefresherRefresh: () => Promise<boolean>;
} & ScrollViewProps;

const ScrollViewComponent: FunctionComponent<ScrollViewComponentProps> =
  observer((props) => {
    const { data, onRefresherRefresh, onScrollToLower, children, ...rest } =
      props;
    const { refresherTriggered, handleRefresherTriggered } =
      useRefresherTriggered(onRefresherRefresh);
    if (data.length === 0) return <View>暂无数据</View>;

    return (
      <ScrollView
        scrollY
        scrollWithAnimation
        enableBackToTop
        onScrollToLower={onScrollToLower}
        refresherEnabled
        refresherTriggered={refresherTriggered}
        onRefresherRefresh={handleRefresherTriggered}
        {...rest}
      >
        {data.length === 0 ? <View>暂无数据</View> : children}
      </ScrollView>
    );
  });

export { ScrollViewComponent };
