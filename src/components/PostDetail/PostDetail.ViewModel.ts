import { ViewModelWithModule } from '@/utils/index';
import { action, observable, computed } from 'mobx';

export class PostDetailViewModel extends ViewModelWithModule {
  preViewImage = (current: string) => {
    this._imageModule.previewImage([], current);
  };

  @observable
  post: Base.PostWithUser;

  @observable
  postId: number;

  @observable
  ownerId: number;

  @computed
  get photoArray() {
    if (!this.post) return [];
    return this.post.photos.split(',');
  }

  @action
  private _getPostId() {
    const params = this._appModule.getRouterParams();
    this.postId = parseInt(params.postId, 10);
  }

  constructor() {
    super({});
    this._getPostId();
    this._getDetail();
  }

  @action
  private async _getDetail() {
    const ids = [this.postId];
    const res = await this._postModule.getPostByIds(ids);
    this.post = res[0];
    const { user_id: ownerId } = res[0];
    this.ownerId = ownerId;
  }
}
