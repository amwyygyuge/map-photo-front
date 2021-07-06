declare namespace Base {
  type Comment = {
    children_count: number;
    comment: string;
    created_at: string;
    does_self_liked: boolean;
    id: number;
    photo_group_id: number;
    praise_count: number;
    scroll_id: number;
    status: number;
    user: User;
    user_like: null;
    user_id: number;
  };
  type ChildComment = {
    from_user: User;
    from_user_id: number;
  } & Omit<Comment, 'children_count' | 'user' | 'user_id'>;

  type Location = {
    latitude: number;
    longitude: number;
  };
  interface Result<T> {
    code: number;
    message: string;
    data: T;
  }
  type UserLike = {
    created_at: string;
    id: number;
    target_id: number;
    user_id: number;
  };
  type User = {
    avatarUrl: string;
    city: string;
    comment_count: number;
    country: string;
    does_self_followed: boolean;
    fans_count: number;
    follow_count: number;
    gender: number;
    id: number;
    language: string;
    like_count: number;
    nickName: string;
    photo_group_count: number;
    praise_count: number;
    province: string;
    wechat_open_id: string;
    wechat_union_id: string;
  };

  type UserId = number | string;
  type Post = {
    access: number;
    accuracy_count: number;
    comment_count: number;
    complaint_count: number;
    complaint_status: number;
    cover_photo: string;
    created_at: string;
    description: string;
    id: number;
    inaccuracy_count: number;
    latitude: number;
    location: string;
    longitude: number;
    photos: string;
    praise_count: number;
    status: number;
    updated_at: string;
    user_id: number;
    scroll_id: number;
    does_self_liked: false;
  };

  type Attention = {
    created_at: string;
    follower: number;
    id: number;
    publisher: number;
  };

  type Follow = {
    attention: Attention;
    does_self_followed: boolean;
    user: User;
  };

  type PostWithUser = Post & { user_info: User };
  type Region = {
    northeast: Location;
    southwest: Location;
  };
}
