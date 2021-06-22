import { action, observable } from 'mobx';

import { ViewModelWithModule } from '@/utils/index';

export type KudosButtonProps = {
  isKudos: boolean;
  postId: number;
};
export class KudosButtonViewModel extends ViewModelWithModule<KudosButtonProps> {
  @observable
  isKudos: boolean;

  constructor(props: KudosButtonProps) {
    super(props);
    this.isKudos = this.props.isKudos;
  }

  @action
  handleClick = async () => {
    const text = this.isKudos ? '取消点赞' : '点赞';
    const doAction = this.isKudos
      ? this._postModule.unLike
      : this._postModule.like;
    this.isKudos = !this.isKudos;
    try {
      await doAction(this.props.postId);
      this._taro.atMessage({
        type: 'success',
        message: `${text}成功`,
      });
    } catch (error) {
      this.isKudos = !this.isKudos;
      this._taro.atMessage({
        type: 'error',
        message: `${text}失败`,
      });
    }
  };
}
