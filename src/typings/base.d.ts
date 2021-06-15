declare namespace Base {
  type Location = {
    latitude: number;
    longitude: number;
  };
  interface Result<T> {
    code: number;
    message: string;
    data: T;
  }
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

  type PostWithUser = Post & { user: User };
  type Region = {
    northeast: Location;
    southwest: Location;
  };
}
