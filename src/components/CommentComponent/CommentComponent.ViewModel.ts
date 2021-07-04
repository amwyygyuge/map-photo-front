import { computed, action, observable } from 'mobx';
import { ViewModelWithModule } from '@/utils/index';

export type CommentComponentProps = {
  userId: number;
  isFollowed: boolean;
};
export class CommentComponentViewModel extends ViewModelWithModule<FollowButtonProps> { }
