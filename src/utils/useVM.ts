import { useState, useEffect } from 'react';
import {
  observable,
  runInAction,
  reaction,
  IReactionDisposer,
  IReactionPublic,
  IReactionOptions,
} from 'mobx';
import {
  getModule,
  APP_MODULE,
  AppModule,
  PROFILE_MODULE,
  ProfileModule,
  IMAGE_MODULE,
  ImageModule,
  RecommendModule,
  RECOMMEND_MODULE,
} from '@/SDK/index';
import { getProfileController } from '@/controller/ProfileController';
import Taro from '@tarojs/taro';

export class ViewModel<T = {}> {
  @observable
  props: T;

  constructor(props: T) {
    this.props = props;
  }
}

export class ViewModelWithModule<T = {}> extends ViewModel<T> {
  private _reactionDisposers: IReactionDisposer[] = [];

  protected _appModule = getModule<AppModule>(APP_MODULE);

  protected _profileModule = getModule<ProfileModule>(PROFILE_MODULE);

  protected _imageModule = getModule<ImageModule>(IMAGE_MODULE);

  protected _recommendController = getModule<RecommendModule>(RECOMMEND_MODULE);

  protected _profileController = getProfileController();

  protected _taro = Taro;

  protected _logger = this._taro.getRealtimeLogManager();

  constructor(props: T) {
    super(props);
  }

  protected _reaction = (
    expression: (r: IReactionPublic) => T,
    effect: (arg: T, r: IReactionPublic) => void,
    opts?: IReactionOptions,
  ) => {
    this._reactionDisposers.push(reaction(expression, effect, opts));
  };

  dispose = () => {
    this._reactionDisposers.forEach((disposer) => disposer());
  };
}

function useAsObservableSource<T>(current: T): T {
  const [res] = useState(() => observable(current, {}, { deep: false }));
  runInAction(() => {
    Object.assign(res, current);
  });
  return res;
}

export function useVM<T extends ViewModelWithModule, P = {}>(
  M: new (props: P) => T,
  props,
): T {
  const observableProps = useAsObservableSource(props);
  const [vm] = useState(() => new M(observableProps));
  useEffect(() => {
    return () => {
      vm?.dispose();
    };
  }, []);
  return vm;
}
