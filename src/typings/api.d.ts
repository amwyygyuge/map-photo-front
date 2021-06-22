declare namespace API {
  type CommentId = {
    comment_id: number;
  };

  type PostId = {
    photo_group_id: number;
  };
  type ListParam = {
    scroll_id: number;
    limit: number;
  };

  type updateUserInfoParams = {
    wechat_nick_name: string;
    wechat_avatar_url: string;
    wechat_gender: number;
    wechat_country: string;
    wechat_province: string;
    wechat_city: string;
  };

  type updateUserInfoReturn = {
    id: number;
    wechat_open_id: string;
    wechat_union_id: string;
    wechat_nick_name: string;
    wechat_avatar_url: string;
    wechat_gender: number;
    wechat_country: string;
    wechat_province: string;
    wechat_city: string;
    photo_group_count: number;
    fans_count: number;
    follow_count: number;
    praise_count: number;
    comment_count: number;
    like_count: number;
    created_at: string;
  };

  type preCreateReturn = PostId;

  type createPostParams = {
    id: number;
    access: number;
    description: string;
    latitude: number;
    longitude: number;
    location: string;
    cover_photo: string;
    photos: string;
  };

  type createPostReturn = PostId;
  type getUserInfoParams = {
    id: number;
  };
  type getUserListParams = {
    user_id: number;
  } & ListParam;

  type getUserPostReturn = PostId;

  type getRecommendByLocationParams = {
    bottom_right: number[];
    top_left: number[];
    scroll_id: string;
    limit: number;
  };

  type getRecommendGlobalParams = {
    scroll_id: string;
    limit: number;
  };

  type getPostsByIdsParams = {
    ids: number[];
  };

  type FollowParams = {
    publisher: number;
  };

  type RecommendReturn = {
    list: number[];
    scroll_id: string;
  };

  type LikeParams = PostId;

  type createCommentParams = {
    comment: string;
  } & PostId;

  type getHotsCommentParams = {
    owner_id: number;
  } & PostId;

  type getOthersCommentParams = {
    owner_id: number;
    hot_comment_ids: number[];
  } & ListParam &
    PostId;
}
