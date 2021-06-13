import { computed, action, observable } from 'mobx';
import { getModule, PROFILE_MODULE, ProfileModule } from '@/SDK/index';
import { getProfileController } from '@/controller/ProfileController';
import { ViewModelWithModule } from '@/utils/index';

export type FollowButtonProps = {
  userId: number;
  isFollowed: boolean;
};
export class FollowButtonViewModel extends ViewModelWithModule<FollowButtonProps> {
  _profileModule = getModule<ProfileModule>(PROFILE_MODULE);

  profileController = getProfileController();

  @observable
  isFollowed: boolean;

  constructor(props: FollowButtonProps) {
    super(props);
    this.isFollowed = this.props.isFollowed;
  }

  @computed
  get isMe() {
    return this.profileController.userId === this.props.userId;
  }

  @computed
  get text() {
    return this.isFollowed ? '已关注' : '关注';
  }

  @action
  handleClick = async () => {
    const doAction = this.isFollowed
      ? this._profileModule.unFollowUser
      : this._profileModule.followUser;
    this.isFollowed = !this.isFollowed;
    const res = await doAction(this.props.userId);
    if (res.data! == this.isFollowed) {
      this._taro.atMessage({
        type: 'error',
        message: '关注失败',
      });
    } else {
      this._taro.atMessage({
        type: 'success',
        message: '关注成功',
      });
    }

    this.isFollowed = res.data;
  };
}
