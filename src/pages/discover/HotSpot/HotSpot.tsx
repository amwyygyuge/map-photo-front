import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { HotSpotViewModel } from './HotSpot.ViewModel';
import { FunctionComponent } from 'react';
import './HotSpot.scss';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { PostListComponent } from '@/components/PostListComponent';

const HotSpot: FunctionComponent = observer(() => {
  const { handleScrollToLower, data, currentIndex, handleTabClick } = useVM(
    HotSpotViewModel,
    {},
  );

  const tabList = [{ title: '热点' }, { title: '最新' }];
  return (
    <AtTabs current={currentIndex} tabList={tabList} onClick={handleTabClick}>
      <AtTabsPane current={0} index={0}>
        <PostListComponent data={data} onScrollToLower={handleScrollToLower} />
      </AtTabsPane>
      <AtTabsPane current={0} index={1}>
        <PostListComponent data={data} onScrollToLower={handleScrollToLower} />
      </AtTabsPane>
    </AtTabs>
  );
});

export { HotSpot };
