import { action, computed, observable } from 'mobx';

import { ViewModelWithModule } from '@/utils/index';

export type KudosButtonProps = {
  isKudos: boolean;
  id: number;
  type: KUDOS_TYPE;
  count?: number;
};

export enum KUDOS_TYPE {
  POST = 'POST',
  COMMENT = 'COMMENT',
  CHILD_COMMENT = 'CHILD_COMMENT',
}
export class KudosButtonViewModel extends ViewModelWithModule<KudosButtonProps> {
  @observable
  isKudos: boolean;

  @observable
  count?: number;

  constructor(props: KudosButtonProps) {
    super(props);
    this.isKudos = this.props.isKudos;
    this.count = this.props.count;
  }

  private likeConfig = {
    [KUDOS_TYPE.POST]: this._postModule.like,
    [KUDOS_TYPE.COMMENT]: this._commentModule.like,
    [KUDOS_TYPE.CHILD_COMMENT]: this._commentModule.likeChildComment,
  };

  private unLikeConfig = {
    [KUDOS_TYPE.POST]: this._postModule.unLike,
    [KUDOS_TYPE.COMMENT]: this._commentModule.unLike,
    [KUDOS_TYPE.CHILD_COMMENT]: this._commentModule.unLikeChildComment,
  };

  @computed
  get like() {
    return this.likeConfig[this.props.type];
  }

  @computed
  get unLike() {
    return this.unLikeConfig[this.props.type];
  }

  @action
  handleClick = async () => {
    const text = this.isKudos ? '取消点赞' : '点赞';
    const countAction = this.isKudos
      ? () => {
        this.count !== undefined && this.count--;
      }
      : () => {
        this.count !== undefined && this.count++;
      };
    const doAction = this.isKudos ? this.unLike : this.like;
    this.isKudos = !this.isKudos;
    try {
      countAction();
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
