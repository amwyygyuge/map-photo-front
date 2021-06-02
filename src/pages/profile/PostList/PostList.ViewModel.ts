import { computed, observable } from 'mobx';
import { getModule, PROFILE_MODULE, ProfileModule } from '@/SDK/index';

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
export class PostListViewModel {
  _profileModule = getModule<ProfileModule>(PROFILE_MODULE);

  constructor() {
    this.init();
  }

  init = async () => {
    const res = await this._profileModule.getUserPost();
    this.posts = res;
  };

  @observable.shallow
  posts: Post[] = posts;
}
