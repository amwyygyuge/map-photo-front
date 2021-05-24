import { PROFILE_MODULE, ProfileController } from './ProfileController';

class ModuleManager {
  private _modules: Map<string, Object> = new Map();

  registerModule = (key: string, Controller: new () => Object) => {
    if (!this._modules.get(key)) {
      this._modules.set(key, new Controller());
    }
  };

  getModule = (key: string) => {
    return this._modules.get(key);
  };
}

const moduleManager = new ModuleManager();

const initModule = () => {
  moduleManager.registerModule(PROFILE_MODULE, ProfileController);
};

const getModule = (key: string) => moduleManager.getModule(key);
export { initModule, getModule };
