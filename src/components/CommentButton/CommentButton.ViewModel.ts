import { action, computed, observable } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';
import { EVENT_KEY } from '../../constants';

export type CommentButtonProps = {
  postId: number;
};
export class CommentButtonViewModel extends ViewModelWithModule<CommentButtonProps> {
  @observable
  isOpen: boolean = false;

  @observable
  input: string = '';

  @action
  handleClick = () => {
    this.isOpen = true;
  };

  @action
  handleClose = () => {
    this.isOpen = false;
  };

  @action
  handleComment = async () => {
    const res = await this._commentModule.createComment({
      photo_group_id: this.props.postId,
      comment: this.input,
    });
    this.isOpen = false;

    this._taro.eventCenter.trigger(
      `${EVENT_KEY.NEW_COMMENT}.${this.props.postId}`,
      res.data,
    );
  };

  @action
  handleInput = (value) => {
    this.input = value;
  };
}
