import Taro from '@tarojs/taro';
import ExifReader from 'exifreader';
import { requestController } from '@/utils/RequestController';

const logger = Taro.getRealtimeLogManager();

export const IMAGE_MODULE = 'IMAGE_MODULE';

const MAX_SIZE = 1000 * 1000 * 2;

const MAX_CHECK_SIZE = 1000 * 5210 - 1;

const rex = /[^\.]\w*$/;

export class ImageModule {
  async createPost(data: {
    access: number;
    description: string;
    latitude: number;
    longitude: number;
    location: string;
    photos: string[];
  }) {
    const { photos, description, latitude, longitude, location } = data;
    const results = await Promise.all(
      photos.map((path) => this.compressImage(path)),
    );
    const compressImages = results.map((result) => result.tempFilePath);
    // const _results = await Promise.all(
    //   compressImages.map((path) => this.getImageSize(path)),
    // );
    // logger.info('file after compress', _results);

    // console.log(compressImages, _results);
    const {
      data: { photo_group_id },
    } = await requestController.preCreate();
    const uploadResults = await this._uploadToCloud({
      photo_group_id,
      pants: compressImages,
    });
    const _photos = uploadResults.map((item) => item.fileID);
    await requestController.createPost({
      id: photo_group_id,
      access: 1,
      description,
      latitude,
      longitude,
      location,
      photos: _photos.join(','),
      cover_photo: _photos[0],
    });
  }

  isImageSizeExceed(size: number) {
    return size >= MAX_SIZE;
  }

  private _uploadToCloud(data: { photo_group_id: number; pants: string[] }) {
    const { pants, photo_group_id } = data;
    return Promise.all(
      pants.map((pant, index) => {
        return Taro.cloud.uploadFile({
          cloudPath: `pm/${photo_group_id}/file/${index}.jpg`,
          filePath: pant,
        });
      }),
    );
  }

  getLocationFromFiles(pants: string[]) {
    return pants.find((path) => this.getLocationFromFilePath(path));
  }

  getLocationFromFilePath(path?: string) {
    if (!path) return false;
    const tags = ExifReader.load(this._getImageData(path), { expanded: true });
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

  private _getImageData(path: string) {
    return Taro.getFileSystemManager().readFileSync(path) as ArrayBuffer;
  }

  compressImage(path: string) {
    return Taro.compressImage({ src: path });
  }

  async checkMsg(content: string) {
    const { result } = await Taro.cloud.callFunction({
      name: 'msgCheck',
      data: {
        content,
      },
    });
    return result?.errCode === 0;
  }

  getImageInfo(path: string) {
    return Taro.getImageInfo({
      src: path,
    });
  }

  getImageType(path: string) {
    const result = rex.exec(path);
    if (result) {
      return result[0];
    }
    return '';
  }

  previewImage(pants: string[], current?: string) {
    Taro.previewImage({
      urls: pants,
      current: current ?? pants[0],
    });
  }

  async getImageSize(path: string) {
    return (await Taro.getFileInfo({ filePath: path })).size as number;
  }

  async checkImages(paths: string[]) {
    const promises = paths.map((path) => this.checkImage(path));
    const results = await Promise.all(promises);
    return !results.some((result) => result === false);
  }

  async checkImage(path: string) {
    let currentPath = path;
    if ((await this.getImageSize(path)) > MAX_CHECK_SIZE) {
      const { tempFilePath } = await this.compressImage(path);
      currentPath = tempFilePath;
    }
    const type = this.getImageType(currentPath);
    try {
      const { result } = await Taro.cloud.callFunction({
        name: 'imageCheck',
        data: {
          contentType: `image/${type}`,
          content: this._getImageData(currentPath),
        },
      });
      return result?.errCode === 0;
    } catch (error) {
      return true;
    }
  }
}
