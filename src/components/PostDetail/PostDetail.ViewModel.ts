import { ViewModelWithModule } from '@/utils/index';
import { action, observable, computed } from 'mobx';

export class PostDetailViewModel extends ViewModelWithModule {
  preViewImage = (current: string) => {
    this._imageModule.previewImage([], current);
  };

  @observable
  post: Base.PostWithUser;

  @computed
  get photoArray() {
    if (!post) return [];
    return post.photos.split(',');
  }

  constructor() {
    super({});
    this.getDetail();
  }

  @action
  async getDetail() {
    const params = this._appModule.getRouterParams();
    const ids = [params.postId];
    const res = await this._profileModule.getPostByIds(ids);
    this.post = res[0];
  }
}
