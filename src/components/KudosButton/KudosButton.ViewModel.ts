import { action, computed, observable } from 'mobx';

import { ViewModelWithModule } from '@/utils/index';

export type KudosButtonProps = {
  isKudos: boolean;
  id: number;
  type: KUDOS_TYPE;
};

export enum KUDOS_TYPE {
  POST = 'POST',
  COMMENT = 'COMMENT',
}
export class KudosButtonViewModel extends ViewModelWithModule<KudosButtonProps> {
  @observable
  isKudos: boolean;

  constructor(props: KudosButtonProps) {
    super(props);
    this.isKudos = this.props.isKudos;
  }

  @computed
  get like() {
    return this.props.type === KUDOS_TYPE.POST
      ? this._postModule.like
      : this._commentModule.like;
  }

  @computed
  get unLike() {
    return this.props.type === KUDOS_TYPE.POST
      ? this._postModule.unLike
      : this._commentModule.unLike;
  }

  @action
  handleClick = async () => {
    const text = this.isKudos ? '取消点赞' : '点赞';
    const doAction = this.isKudos ? this.unLike : this.like;
    this.isKudos = !this.isKudos;
    try {
      await doAction(this.props.id);
      this._taro.showToast({
        icon: 'success',
        title: `${text}成功`,
      });
    } catch (error) {
      this.isKudos = !this.isKudos;
      this._taro.showToast({
        title: `${text}失败`,
      });
    }
  };
}
