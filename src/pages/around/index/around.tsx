import { View, CoverView, Button, CoverImage } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { AroundViewModel } from './around.ViewModel';
import { FunctionComponent } from 'react';
import { MapPhoto } from '../components/MapPhoto';
import './around.scss';

const Around: FunctionComponent = observer(() => {
  const { handleGoToList, handleReload, location, markers } = useVM<
    AroundViewModel,
    {}
  >(AroundViewModel, {});
  return (
    <View className="map-container">
      <MapPhoto {...location} markers={[markers]}>
        <CoverView className="map-tool">
          <Button type="primary" onClick={handleGoToList}>
            列表
          </Button>
          <Button type="primary" onClick={handleReload}>
            刷新
          </Button>
        </CoverView>
        <CoverView slot="callout">
          <CoverView markerId="1" className="maker">
            <CoverImage src="/image/a.png" className="image" />
            <CoverView className="content">dwadada</CoverView>
          </CoverView>
        </CoverView>
      </MapPhoto>
    </View>
  );
});

export { Around };
