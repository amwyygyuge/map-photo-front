import { useState } from 'react';
import { observable, runInAction } from 'mobx';

function useAsObservableSource<T>(current: T): T {
  const [res] = useState(() => observable(current, {}, { deep: false }));
  runInAction(() => {
    Object.assign(res, current);
  });
  return res;
}

export function useVM<T, P>(ViewModel: new (props: P) => T, props): T {
  const observableProps = useAsObservableSource(props);
  const [vm] = useState(() => new ViewModel(observableProps));
  return vm;
}
