import { computed } from 'mobx';
import { getModule, PROFILE_MODULE, ProfileModule } from '@/SDK/index';
import { getProfileController } from '@/controller/ProfileController';
import { ViewModel } from '@/utils/index';

export type FollowButtonProps = {};
export class FollowButtonViewModel extends ViewModel<FollowButtonProps> {
  _profileModule = getModule<ProfileModule>(PROFILE_MODULE);

  profileController = getProfileController();
}
