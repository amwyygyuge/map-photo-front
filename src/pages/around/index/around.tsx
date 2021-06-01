import { View, CoverView, Button, CoverImage, Map } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { AroundViewModel } from './around.ViewModel';
import { FunctionComponent } from 'react';
import listIcon from '../../../image/list.png';
import reloadIcon from '../../../image/reload.png';
import myLocationIcon from '../../../image/myLocation.png';

import './around.scss';

const Around: FunctionComponent = observer(() => {
  const {
    handleGoToList,
    handleReload,
    location,
    markers,
    handleMoveToMyLocation,
  } = useVM<AroundViewModel, {}>(AroundViewModel, {});
  return (
    <View className="map-container">
      <Map
        id="mainMap"
        className="MapPhoto"
        showScale
        {...location}
        markers={markers}
      >
        <CoverView className="map-tool">
          <CoverImage
            className="icon"
            src={listIcon}
            onClick={handleGoToList}
          />
          <CoverImage
            className="icon"
            src={reloadIcon}
            onClick={handleReload}
          />
        </CoverView>
        <CoverImage
          className="location-icon"
          src={myLocationIcon}
          onClick={handleMoveToMyLocation}
        />
        <CoverView slot="callout">
          <CoverView markerId="1" className="maker">
            <CoverImage
              src="cloud://testing-5g65b9i2e503e641.7465-testing-5g65b9i2e503e641-1303943117/pm/11/file/0.jpg"
              className="image"
            />
            {/* <CoverView className="content">dwadada</CoverView> */}
          </CoverView>
        </CoverView>
      </Map>
    </View>
  );
});

export { Around };
