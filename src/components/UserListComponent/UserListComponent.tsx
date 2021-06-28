import { ScrollView, View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import { FunctionComponent } from 'react';
import './UserListComponent.scss';
import { AtAvatar } from 'taro-ui';
import { FollowButton } from '../FollowButton';
import { CommonEventFunction } from '@tarojs/components/types/common';

type UserListViewProps = {
  data: Base.Follow[];
  onScrollToLower: CommonEventFunction;
  onAvatarClick(id: number): void;
};

const UserListComponent: FunctionComponent<UserListViewProps> = observer(
  (props) => {
    const { data, onScrollToLower, onAvatarClick } = props;
    if (data.length === 0) return <View>暂无数据</View>;

    return (
      <ScrollView
        className="list"
        scrollY
        scrollWithAnimation
        enableBackToTop
        refresherBackground="#000"
        onScrollToLower={onScrollToLower}
      >
        {data.map((item) => {
          const {
            does_self_followed,
            user: { id, avatarUrl, fans_count, follow_count, nickName },
          } = item;
          return (
            <View className="post-card at-row" key={id}>
              <View className="user-info" onClick={() => onAvatarClick(id)}>
                <AtAvatar
                  circle
                  size="small"
                  text="头像"
                  className="avatar"
                  image={avatarUrl}
                />
                <View className="infos">
                  <Text className="userName">{nickName}</Text>
                  <Text className="info">
                    粉丝 {fans_count} 关注 {follow_count}
                  </Text>
                </View>
              </View>
              <View className="actions">
                <FollowButton isFollowed={does_self_followed} userId={id} />
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  },
);

export { UserListComponent };
