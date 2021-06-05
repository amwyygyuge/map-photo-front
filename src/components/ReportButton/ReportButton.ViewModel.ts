import { computed } from 'mobx';
import { getModule, PROFILE_MODULE, ProfileModule } from '@/SDK/index';

import { getProfileController } from '@/controller/ProfileController';

export class ReportButtonViewModel {
  _profileModule = getModule<ProfileModule>(PROFILE_MODULE);

  profileController = getProfileController();
}
