import { computed } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';

export type KudosButtonProps = {
  isKudos: boolean;
  postId: number;
};
export class KudosButtonViewModel extends ViewModelWithModule<KudosButtonProps> {
  @computed
  get iconName() {
    return this.props.isKudos ? 'heart-2' : 'heart';
  }

  handleClick = () => { };
}
