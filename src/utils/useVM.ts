import { useState } from 'react';
import { observable, runInAction } from 'mobx';

export class ViewModel<T> {
  @observable
  props: T;

  constructor(props: T) {
    this.props = props;
  }
}

function useAsObservableSource<T>(current: T): T {
  const [res] = useState(() => observable(current, {}, { deep: false }));
  runInAction(() => {
    Object.assign(res, current);
  });
  return res;
}

export function useVM<T, P = {}>(M: new (props: P) => T, props): T {
  const observableProps = useAsObservableSource(props);
  const [vm] = useState(() => new M(observableProps));
  return vm;
}
