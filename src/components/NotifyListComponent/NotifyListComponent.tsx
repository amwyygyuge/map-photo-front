import { ScrollView, View } from '@tarojs/components';
import { observer } from 'mobx-react';
import { FunctionComponent } from 'react';
import './NotifyListComponent.scss';
import { CommonEventFunction } from '@tarojs/components/types/common';

type UserListViewProps = {
  data: Base.Notify[];
  onScrollToLower: CommonEventFunction;
};

const NotifyListComponent: FunctionComponent<UserListViewProps> = observer(
  (props) => {
    const { data, onScrollToLower } = props;
    if (data.length === 0) return <View>暂无数据</View>;

    return (
      <ScrollView
        className="notify-list"
        scrollY
        scrollWithAnimation
        enableBackToTop
        refresherBackground="#000"
        onScrollToLower={onScrollToLower}
      >
        {data.map((item) => {
          const { title, id } = item;
          return (
            <View className="post-card at-row" key={id}>
              {title}
            </View>
          );
        })}
      </ScrollView>
    );
  },
);

export { NotifyListComponent };
