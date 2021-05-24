import Taro from '@tarojs/taro';
import { computed, observable, action } from 'mobx';
import ExifReader from 'exifreader';
import { File } from 'taro-ui/types/image-picker';
import location from '../../../image/location.svg';
import { KEY, REFERER } from '@/config/lbs.config';

export class SendPostViewModel {
  constructor() {
    this._getLocation();
  }

  @computed
  get markers() {
    return [
      {
        id: 11,
        title: '你的位置',
        iconPath: location,
        width: 30,
        height: 30,
        ...this.location,
      },
    ];
  }

  @observable
  title: string;

  @observable
  description: string;

  @action
  handleTitleChange = (input: string) => {
    this.title = input;
  };

  @action
  handleDescriptionChange = (input: string) => {
    this.description = input;
  };

  @observable
  files: File[] = [];

  @observable
  location = {
    latitude: 0,
    longitude: 0,
  };

  handleSearch = () => {
    Taro.navigateTo({
      url: `plugin://chooseLocation/index?key=${KEY}&referer=${REFERER}&location=${JSON.stringify(
        this.location,
      )}`,
    });
  };

  private _getLocation = async () => {
    const location = await Taro.getLocation({ isHighAccuracy: true });
    this.location = location;
  };

  @action
  handleMapTap = (e: {
    detail: {
      latitude: number;
      longitude: number;
    };
  }) => {
    this.location = e.detail;
  };

  @action
  handleImageUpload = (files: File[], operationType: 'add' | 'remove') => {
    if (operationType === 'add') {
      console.log(this._getLocationFromFiles(files));
    }
    this.files = files;
  };

  private _getLocationFromFiles(files: File[]) {
    return files.find((file) => this.getLocationFromFilePath(file.file?.path));
  }

  private getLocationFromFilePath(filePath?: string) {
    if (!filePath) return false;
    const tags = ExifReader.load(
      Taro.getFileSystemManager().readFileSync(filePath) as ArrayBuffer,
      { expanded: true },
    );
    const GPSLatitude = tags?.exif?.GPSLatitude?.description;
    const GPSLongitude = tags?.exif?.GPSLongitude?.description;
    if (GPSLatitude && GPSLongitude) {
      return {
        latitude: GPSLatitude,
        longitude: GPSLongitude,
      };
    }
    return false;
  }
}
