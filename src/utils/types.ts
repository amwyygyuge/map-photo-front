export type updateUserInfoParams = {
  wechat_nick_name: string;
  wechat_avatar_url: string;
  wechat_gender: number;
  wechat_country: string;
  wechat_province: string;
  wechat_city: string;
};

export type updateUserInfoReturn = {
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

export type preCreateReturn = {
  photo_group_id: number;
};

export type createPostParams = {
  id: number;
  access: number;
  description: string;
  latitude: number;
  longitude: number;
  location: string;
  cover_photo: string;
  photos: string;
};

export type createPostReturn = {
  photo_group_id: number;
};
export type getUserInfoParams = {
  id: number;
};
export type getUserPostParams = {
  user_id: number;
  id: number;
  limit: number;
};

export type getUserPostReturn = {
  photo_group_id: number;
};

export type getRecommendByLocationParams = {
  latitude: number;
  longitude: number;
  scroll_id: number;
};

export type getRecommendByLocationReturn = {
  photo_group_id: number;
};

export type getRecommendGlobalParams = {
  scroll_id: number;
};

export type getRecommendGlobalReturn = {
  photo_group_id: number;
};
