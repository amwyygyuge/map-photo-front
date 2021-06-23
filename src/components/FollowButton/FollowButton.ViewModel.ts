import { computed, action, observable } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';

export type FollowButtonProps = {
  userId: number;
  isFollowed: boolean;
};
export class FollowButtonViewModel extends ViewModelWithModule<FollowButtonProps> {
  @observable
  isFollowed: boolean;

  constructor(props: FollowButtonProps) {
    super(props);
    this.isFollowed = this.props.isFollowed;
  }

  @computed
  get isMe() {
    return this._profileModule.userId === this.props.userId;
  }

  @computed
  get text() {
    return this.isFollowed ? '已关注' : '关注';
  }

  @action
  handleClick = async () => {
    const text = this.isFollowed ? '取消关注' : '关注';
    const doAction = this.isFollowed
      ? this._profileModule.unFollowUser
      : this._profileModule.followUser;
    this.isFollowed = !this.isFollowed;
    try {
      await doAction(this.props.userId);
      this._taro.atMessage({
        type: 'success',
        message: `${text}成功`,
      });
    } catch (error) {
      this.isFollowed = !this.isFollowed;
      this._taro.atMessage({
        type: 'error',
        message: `${text}失败`,
      });
    }
  };
}
