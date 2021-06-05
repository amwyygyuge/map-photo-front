import { action, observable } from 'mobx';
import {
  getModule,
  IMAGE_MODULE,
  ImageModule,
  APP_MODULE,
  ProfileModule,
  PROFILE_MODULE,
  AppModule,
} from '@/SDK/index';
import { PostWithUser } from '@/utils/RequestType';
import { getProfileController } from '@/controller/ProfileController';

export class PostDetailViewModel {
  private _imageModule = getModule<ImageModule>(IMAGE_MODULE);

  private _profileModule = getModule<ProfileModule>(PROFILE_MODULE);

  private _appModule = getModule<AppModule>(APP_MODULE);

  profileController = getProfileController();

  @observable
  post: PostWithUser;

  constructor() {
    this.getDetail();
  }

  @action
  async getDetail() {
    const params = this._appModule.getRouterParams();
    console.log(params);
    const ids = [params.postId];
    const res = await this._profileModule.getPostByIds(ids);
    console.log(res);
    this.post = res[0];
  }

  preViewImage = (current: string) => {
    this._imageModule.previewImage([], current);
  };
}
