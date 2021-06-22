import { action, computed, observable } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';

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
    await this._commentModule.createComment({
      photo_group_id: this.props.postId,
      comment: this.input,
    });
    this.isOpen = false;
  };

  @action
  handleInput = (value) => {
    this.input = value;
  };
}
