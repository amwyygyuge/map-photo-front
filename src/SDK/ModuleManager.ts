import { PROFILE_MODULE, ProfileController } from './ProfileController';
import { IMAGE_MODULE, ImageController } from './ImageController';
import { RECOMMEND_MODULE, RecommendController } from './RecommendController';

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
  moduleManager.registerModule(PROFILE_MODULE, ProfileController);
  moduleManager.registerModule(IMAGE_MODULE, ImageController);
  moduleManager.registerModule(RECOMMEND_MODULE, RecommendController);
};

const getModule = <T>(key: string): T => moduleManager.getModule<T>(key);
export { initModule, getModule };
