import { action, observable } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';
import { EVENT_KEY } from '../../constants';
import React from 'react';
import { AtIconProps } from 'taro-ui/types/icon';

export type CommentButtonProps = {
  id: number;
  type: COMMENT_TYPE;
  toUserId?: number;
  count?: number;
  disabledClick?: boolean;
  render?: React.ReactNode;
  size?: AtIconProps['size'];
};

export enum COMMENT_TYPE {
  POST = 'POST',
  COMMENT = 'COMMENT',
}

export class CommentButtonViewModel extends ViewModelWithModule<CommentButtonProps> {
  @observable
  count?: number;

  @observable
  isOpen: boolean = false;

  @observable
  input: string = '';

  constructor(props: CommentButtonProps) {
    super(props);
    this.count = this.props.count;
  }

  @action
  handleClick = () => {
    this.isOpen = true;
  };

  @action
  handleClose = () => {
    this.isOpen = false;
  };

  @action
  async handlePostComment() {
    const res = await this._commentModule.createComment({
      photo_group_id: this.props.id,
      comment: this.input,
    });
    this._taro.eventCenter.trigger(
      `${EVENT_KEY.NEW_COMMENT}.${this.props.id}`,
      res.data,
    );
  }

  @action
  async handleChildComment() {
    const res = await this._commentModule.createChildComment({
      comment_id: this.props.id,
      comment: this.input,
      to_user_id: this.props.toUserId,
    });
    this.count !== undefined && this.count++;
    this._taro.eventCenter.trigger(
      `${EVENT_KEY.NEW_CHILD_COMMENT}.${this.props.id}`,
      res.data,
    );
  }

  @action
  handleComment = () => {
    if (this.props.type === COMMENT_TYPE.POST) {
      this.handlePostComment();
    } else {
      this.handleChildComment();
    }
    this.isOpen = false;
  };

  @action
  handleInput = (value) => {
    this.input = value;
  };
}
