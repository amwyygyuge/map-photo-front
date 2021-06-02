import { PROFILE_MODULE, ProfileModule } from './ProfileModule';
import { IMAGE_MODULE, ImageModule } from './ImageModule';
import { RECOMMEND_MODULE, RecommendModule } from './RecommendModule';
import { APP_MODULE, AppModule } from './AppModule';

class ModuleManager {
  private _modules: Map<string, Object> = new Map();

  registerModule = (key: string, Controller: new () => Object) => {
    if (!this._modules.get(key)) {
      this._modules.set(key, new Controller());
    }
  };

  getModule = <T>(key: string): T => {
    return this._modules.get(key) as T;
  };
}

const moduleManager = new ModuleManager();

const initModule = () => {
  moduleManager.registerModule(APP_MODULE, AppModule);
  moduleManager.registerModule(PROFILE_MODULE, ProfileModule);
  moduleManager.registerModule(IMAGE_MODULE, ImageModule);
  moduleManager.registerModule(RECOMMEND_MODULE, RecommendModule);
};

const getModule = <T>(key: string): T => moduleManager.getModule<T>(key);
export { initModule, getModule };
