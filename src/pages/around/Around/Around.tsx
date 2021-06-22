import { View, CoverView, CoverImage, Map } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { AroundViewModel } from './Around.ViewModel';
import { FunctionComponent } from 'react';
import listIcon from '../../../image/list.png';
import reloadIcon from '../../../image/reload.png';
import searchIcon from '../../../image/search.png';
import myLocationIcon from '../../../image/myLocation.png';

import './Around.scss';

const Around: FunctionComponent = observer(() => {
  const {
    handleGoToList,
    handleReload,
    location,
    markers,
    handleMapTab,
    handleMoveToMyLocation,
    handleRegionChange,
    searchLocation,
    recommendMarker,
    handleCalloutTap,
  } = useVM(AroundViewModel, {});
  return (
    <View className="map-container">
      <CoverView className="map-tool">
        <CoverImage
          className="icon"
          src={searchIcon}
          onClick={searchLocation}
        />
        <CoverImage className="icon" src={listIcon} onClick={handleGoToList} />
        <CoverImage className="icon" src={reloadIcon} onClick={handleReload} />
      </CoverView>
      <CoverImage
        className="location-icon"
        src={myLocationIcon}
        onClick={handleMoveToMyLocation}
      />
      <Map
        id="mainMap"
        className="MapPhoto"
        showScale
        enableRotate={false}
        onTap={handleMapTab}
        onRegionChange={handleRegionChange}
        {...location}
        markers={markers}
        onCalloutTap={handleCalloutTap}
      >
        {recommendMarker.map((mark) => {
          const { id, cover_photo } = mark;

          return (
            <CoverView slot="callout" key={id}>
              <CoverView markerId={id} className="maker">
                <CoverImage src={cover_photo} className="image" />
              </CoverView>
            </CoverView>
          );
        })}
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
