import { observable, action } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';
import { EVENT_KEY } from '../../constants';

export type CommentListComponentViewModelProps = {
  postId: number;
  ownerId: number;
};

export class CommentListComponentViewModel extends ViewModelWithModule<CommentListComponentViewModelProps> {
  constructor(props: CommentListComponentViewModelProps) {
    super(props);
    this._getHotsComment();
    this._taro.eventCenter.on(
      `${EVENT_KEY.NEW_COMMENT}.${this.props.postId}`,
      this._handleNewComment,
    );
  }

  @action
  private _handleNewComment = (comment: Base.Comment) => {
    this.hotComments = [
      { ...comment, user: this._profileModule.profile },
      ...this.hotComments,
    ];
  };

  dispose = () => {
    super.dispose();
    this._taro.eventCenter.off(
      `${EVENT_KEY.NEW_COMMENT}.${this.props.postId}`,
      this._handleNewComment,
    );
  };

  @observable.shallow
  hotComments: Base.Comment[] = [];

  @action
  private async _getHotsComment() {
    const { postId, ownerId } = this.props;
    this.hotComments = await this._commentModule.getHotsComment({
      owner_id: ownerId,
      photo_group_id: postId,
    });
  }
}
