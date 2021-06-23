import { computed } from 'mobx';
import { getModule, PROFILE_MODULE, ProfileModule } from '@/SDK/index';

export class ReportButtonViewModel {
  _profileModule = getModule<ProfileModule>(PROFILE_MODULE);
}
