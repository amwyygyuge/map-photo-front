import { View } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { HotSpotViewModel } from './HotSpot.ViewModel';
import { FunctionComponent } from 'react';
import './HotSpot.scss';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { PostListComponent } from '@/components/PostListComponent';

const HotSpot: FunctionComponent = observer(() => {
  const { handleScrollToLower, data } = useVM(HotSpotViewModel, {});

  const tabList = [
    { title: '标签页1' },
    { title: '标签页2' },
    { title: '标签页3' },
  ];
  return (
    <AtTabs current={0} tabList={tabList}>
      <AtTabsPane current={0} index={0}>
        <PostListComponent data={data} onScrollToLower={handleScrollToLower} />
      </AtTabsPane>
      <AtTabsPane current={0} index={1}>
        <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
          标签页二的内容
        </View>
      </AtTabsPane>
      <AtTabsPane current={0} index={2}>
        <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
          标签页三的内容
        </View>
      </AtTabsPane>
    </AtTabs>
  );
});

export { HotSpot };
