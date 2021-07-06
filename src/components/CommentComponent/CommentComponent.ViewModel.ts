import { computed, observable, action } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';
import { EVENT_KEY } from '../../constants';

export type CommentComponentProps = {
  comment: Base.Comment;
};
export class CommentComponentViewModel extends ViewModelWithModule<CommentComponentProps> {
  constructor(props: CommentComponentProps) {
    super(props);
    this._getHotsComment();
    this._taro.eventCenter.on(
      `${EVENT_KEY.NEW_CHILD_COMMENT}.${this.props.comment.id}`,
      this._handleNewComment,
    );
  }

  @action
  private _handleNewComment = (comment: Base.ChildComment) => {
    this.hotComments = [
      { ...comment, from_user: this._profileModule.profile },
      ...this.hotComments,
    ];
  };

  dispose = () => {
    super.dispose();
    this._taro.eventCenter.off(
      `${EVENT_KEY.NEW_CHILD_COMMENT}.${this.props.comment.id}`,
      this._handleNewComment,
    );
  };

  @observable.shallow
  hotComments: Base.ChildComment[] = [];

  @action
  private async _getHotsComment() {
    const { id: comment_id, user_id: owner_id } = this.props.comment;
    this.hotComments = await this._commentModule.getChildHotsComment({
      comment_id,
      owner_id,
    });
  }
}
