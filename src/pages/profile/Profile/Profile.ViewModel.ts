import { action, computed, observable } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';

export class ProfiledViewModel extends ViewModelWithModule {
  @observable
  profileData: Base.User;

  constructor() {
    super({});
    this.init();
  }

  @observable
  private _userIdInParams: string;

  @computed
  private get _userId() {
    if (this._userIdInParams) {
      return this._userIdInParams;
    }
    return this._profileModule.userId;
  }

  @action
  init = async () => {
    const params = this._appModule.getRouterParams();
    this._userIdInParams = params.userId;
    if (params.userId) {
      this.profileData = await this._profileModule.getUserInfo(params.userId);
      this._taro.setNavigationBarTitle({
        title: `${this.profileData.nickName}的主页`,
      });
      return;
    }
    this.profileData = this._profileModule.profile;
  };

  handleGridClick = (item) => {
    const url = `${item.url}&userId=${this._userId}`;
    this._taro.navigateTo({
      url,
    });
  };
}
