import { Map } from '@tarojs/components';
import { MapProps } from '@tarojs/components/types/Map';
import { observer } from 'mobx-react';
import { FunctionComponent } from 'react';
import './MapPhoto.scss';

export const MapPhoto: FunctionComponent<MapProps> = observer((props) => {
  return <Map {...props} className="MapPhoto" showScale />;
});
