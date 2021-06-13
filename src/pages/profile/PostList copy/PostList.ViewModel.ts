import { action, computed, observable } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';
import { Post } from '@/utils/RequestType';
import { SFDC } from '@/utils/FDC';

export type PostListViewModelProps = {
  userId: number;
};
export class PostListViewModel extends ViewModelWithModule<PostListViewModelProps> {
  constructor(props: PostListViewModelProps) {
    super(props);
    this.init();
  }

  @observable.shallow
  private _foc: SFDC<Post>;

  @computed
  private get _data() {
    return this._foc.data;
  }

  @computed
  private get columns() {
    const column1: Post[] = [];
    const column2: Post[] = [];

    for (let i = 0; i < this._data.length; i++) {
      if (i % 2 === 1) {
        column1.push(this._data[i]);
      } else {
        column2.push(this._data[i]);
      }
    }
    return [column1, column2];
  }

  @computed
  private get column1() {
    return this._foc.data;
  }

  init = async () => {
    const params = this._appModule.getRouterParams();
    const requestFunction = (index: number, limit: number) =>
      this._profileModule.getUserPost(params.userId, index, limit);
    this._foc = new SFDC({
      requestFunction,
      size: 5,
      fetchLimit: 5,
    });
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
