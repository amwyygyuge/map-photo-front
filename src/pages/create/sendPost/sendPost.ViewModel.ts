import Taro from '@tarojs/taro';
import { computed, observable, action } from 'mobx';
import { File } from 'taro-ui/types/image-picker';
import { getModule, IMAGE_MODULE, ImageController } from '@/SDK/index';

const logger = Taro.getRealtimeLogManager();

export class SendPostViewModel {
  constructor() {
    this._getLocation();
  }

  _imageModule = getModule<ImageController>(IMAGE_MODULE);

  @observable
  files: File[] = [];

  @observable
  access: boolean = true;

  @computed
  get address() {
    const { name, address } = this.location;
    if (name || address) {
      return `${name}(${address})`;
    }
    return '所在位置';
  }

  @computed
  get accessLabel() {
    return this.access ? '所有人可见' : '自己可见';
  }

  @observable
  location: {
    latitude: number;
    longitude: number;
    address?: string;
    name?: string;
  } = {
      latitude: 0,
      longitude: 0,
      address: '',
      name: '',
    };

  @observable
  description: string;

  @computed
  get imagePants() {
    return this.files.map((file) => file.url);
  }

  @action
  handleDescriptionChange = (input: string) => {
    this.description = input;
  };

  @action
  handleAccessChange = () => (this.access = !this.access);

  @action
  handleChoseLocation = async () => {
    try {
      const result = await Taro.chooseLocation({
        latitude: this.location.latitude,
        longitude: this.location.longitude,
      });
      this.location = result;
    } catch (error) {
      logger.info(error);
    }
  };

  handleImageTap = (index: number) => {
    this._imageModule.previewImage(this.imagePants, this.imagePants[index]);
  };

  @action
  private _getLocation = async () => {
    this.location = await Taro.getLocation({ isHighAccuracy: true });
  };

  handleSubmit = async () => {
    Taro.showLoading({ title: '发布中，请稍后...', mask: true });

    if (!(await this._imageModule.checkImages(this.imagePants))) {
      Taro.showToast({ title: '图片审核不通过，请检查上传的图片。' });
      Taro.hideLoading();
      return;
    }
    if (!(await this._imageModule.checkMsg(this.description))) {
      Taro.showToast({ title: '文本内容审核不通过，请检查文本内容。' });
      Taro.hideLoading();
      return;
    }
    const { name, address, longitude, latitude } = this.location;
    logger.info(
      'file before compress',
      this.files.map((file) => file.file?.size),
    );
    await this._imageModule.createPost({
      access: this.access ? 1 : 2,
      description: this.description,
      latitude,
      longitude,
      location: `${name}(${address})`,
      photos: this.imagePants,
    });
    Taro.hideLoading();
    Taro.showToast({ title: '发布成功' });
  };

  @action
  handleImageUpload = (files: File[]) => {
    const filteredFiles = files.filter(
      ({ file }) => !this._imageModule.isImageSizeExceed(file!.size),
    );
    if (filteredFiles.length !== files.length) {
      Taro.showToast({ title: '部分图片超出2M，请压缩有重新上传。' });
    }
    this.files = filteredFiles;
  };
}
