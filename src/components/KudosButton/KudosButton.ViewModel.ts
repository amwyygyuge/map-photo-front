import { computed } from 'mobx';
import { getModule, PROFILE_MODULE, ProfileModule } from '@/SDK/index';
import { getProfileController } from '@/controller/ProfileController';
import { ViewModel } from '@/utils/index';

export type KudosButtonProps = {
  isKudos: boolean;
  postId: number;
};
export class KudosButtonViewModel extends ViewModel<KudosButtonProps> {
  _profileModule = getModule<ProfileModule>(PROFILE_MODULE);

  profileController = getProfileController();

  @computed
  get iconName() {
    return this.props.isKudos ? 'heart-2' : 'heart';
  }

  handleClick = () => { };
}
