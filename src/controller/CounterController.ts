import { observable, action } from 'mobx';
import { injectable } from 'inversify';
import { container } from './Container';

const TAG = Symbol.for('CounterController');

@injectable()
class CounterController {
  static counterController: CounterController;

  @observable
  counter = 0;

  @action
  counterStore = () => {
    this.counter++;
  };

  @action
  increment = () => {
    this.counter++;
  };

  @action
  decrement = () => {
    this.counter--;
  };

  @action
  incrementAsync = () => {
    setTimeout(() => {
      this.counter++;
    }, 1000);
  };
}

container.bind<CounterController>(TAG).to(CounterController);
const getCounterController = () => container.get<CounterController>(TAG);

export { CounterController, getCounterController };
