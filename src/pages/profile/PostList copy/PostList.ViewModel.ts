import { computed, observable } from 'mobx';
import {
  getModule,
  APP_MODULE,
  AppModule,
  PROFILE_MODULE,
  ProfileModule,
} from '@/SDK/index';
import { ViewModel } from '@/utils/index';
import { Post } from '@/utils/RequestType';

export type PostListViewModelProps = {
  userId: number;
};
export class PostListViewModel extends ViewModel<PostListViewModelProps> {
  private _appModule = getModule<AppModule>(APP_MODULE);

  private _profileModule = getModule<ProfileModule>(PROFILE_MODULE);

  constructor(props: PostListViewModelProps) {
    super(props);
    this.init();
  }

  init = async () => {
    const params = this._appModule.getRouterParams();
    this.posts = await this._profileModule.getUserPost(params.userId);
  };

  @observable.shallow
  posts: Post[] = [];
}
