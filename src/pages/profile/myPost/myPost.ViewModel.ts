import {
  CounterController,
  getCounterController,
} from '@/controller/CounterController';
import { computed } from 'mobx';

export class MyPostViewModel {
  counterStore: CounterController = getCounterController();

  @computed
  get counter() {
    return this.counterStore.counter;
  }
}
