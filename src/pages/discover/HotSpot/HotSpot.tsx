import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { HotSpotViewModel } from './HotSpot.ViewModel';
import { FunctionComponent } from 'react';

import { AtTabs, AtTabsPane } from 'taro-ui';
import { PostListComponent } from '@/components/PostListComponent';

const HotSpot: FunctionComponent = observer(() => {
  const { handleScrollToLower, data, currentIndex, handleTabClick, tabList } =
    useVM(HotSpotViewModel, {});

  return (
    <AtTabs current={currentIndex} tabList={tabList} onClick={handleTabClick}>
      <AtTabsPane current={0} index={0}>
        <PostListComponent data={data} onScrollToLower={handleScrollToLower} />
      </AtTabsPane>
      <AtTabsPane current={1} index={1}>
        <PostListComponent data={data} onScrollToLower={handleScrollToLower} />
      </AtTabsPane>
      <AtTabsPane current={2} index={2}>
        <PostListComponent data={data} onScrollToLower={handleScrollToLower} />
      </AtTabsPane>
    </AtTabs>
  );
});

export { HotSpot };
