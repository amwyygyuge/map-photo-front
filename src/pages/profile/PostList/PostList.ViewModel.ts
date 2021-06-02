import { computed, observable } from 'mobx';
import {
  getModule,
  APP_MODULE,
  AppModule,
  PROFILE_MODULE,
  ProfileModule,
} from '@/SDK/index';
import { ViewModel } from '@/utils/index';

type Post = {
  access: number;
  description: string;
  latitude: number;
  longitude: number;
  location: string;
  photos: string;
  coverPhoto: string;
};

const post = {
  coverPhoto:
    'cloud://testing-5g65b9i2e503e641.7465-testing-5g65b9i2e503e641-1303943117/pm/11/file/0.jpg',
  description: '测试',
};
const posts = new Array(10).fill(post);

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
  posts: Post[] = posts;
}
