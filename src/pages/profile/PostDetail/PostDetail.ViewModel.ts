import { action, observable } from 'mobx';
import { PostWithUser } from '@/utils/RequestType';
import { ViewModelWithModule } from '@/utils/index';

export class PostDetailViewModel extends ViewModelWithModule {
  @observable
  post: PostWithUser;

  constructor() {
    super({});
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
