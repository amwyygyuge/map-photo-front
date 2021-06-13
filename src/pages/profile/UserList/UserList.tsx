import { Navigator, ScrollView, View, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import {
  UserListViewModel,
  UserListViewModelViewModelProps,
} from './UserList.ViewModel';
import { FunctionComponent } from 'react';
import './UserList.scss';
import { AtAvatar, AtMessage } from 'taro-ui';
import { FollowButton } from '@/components/FollowButton';

const UserList: FunctionComponent<UserListViewModelViewModelProps> = observer(
  (props) => {
    const { data, handleScrollToLower, handleAvatarClick } = useVM(
      UserListViewModel,
      props,
    );
    return (
      <ScrollView
        className="list"
        scrollY
        scrollWithAnimation
        enableBackToTop
        refresherBackground="#000"
        onScrollToLower={handleScrollToLower}
      >
        <AtMessage />
        {data.map((item) => {
          const {
            does_self_followed,
            user: { id, avatarUrl, fans_count, follow_count, nickName },
          } = item;
          return (
            <View className="post-card at-row" key={id}>
              <View className="user-info" onClick={() => handleAvatarClick(id)}>
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

export { UserList };
