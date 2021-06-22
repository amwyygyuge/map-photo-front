import { observable, action } from 'mobx';

import { ViewModelWithModule } from '@/utils/index';

export type CommentListComponentViewModelProps = {
  postId: number;
  ownerId: number;
};

export class CommentListComponentViewModel extends ViewModelWithModule<CommentListComponentViewModelProps> {
  constructor(props: CommentListComponentViewModelProps) {
    super(props);
    this._getHotsComment();
  }

  @observable
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
