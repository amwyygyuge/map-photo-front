import { action, computed, observable } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';
import { Post } from '@/utils/RequestType';

export type PostListViewModelProps = {
  userId: number;
};
export class PostListViewModel extends ViewModelWithModule<PostListViewModelProps> {
  constructor(props: PostListViewModelProps) {
    super(props);
    this.init();
  }

  init = async () => {
    const params = this._appModule.getRouterParams();
    const res = await this._profileModule.getUserPost(params.userId);
    const column2: Post[] = [];
    const column1: Post[] = [];

    for (let i = 0; i < res.length; i++) {
      if (i % 2 === 1) {
        column1.push(res[i]);
      } else {
        column2.push(res[i]);
      }
    }
    this.column1 = column1;
    this.column2 = column2;
  };

  @action
  handleScrollToLower = () => {
    this.column1 = this.column1.concat(...this.column1);
    this.column2 = this.column2.concat(...this.column2);
  };

  @observable.shallow
  column2: Post[] = [];

  column1: Post[] = [];
}
