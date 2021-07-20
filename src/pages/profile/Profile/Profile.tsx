import { View } from '@tarojs/components';
import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { ProfiledViewModel } from './Profile.ViewModel';
import { FunctionComponent } from 'react';
import { AtGrid, AtAvatar } from 'taro-ui';
import './Profile.scss';

const Profile: FunctionComponent = observer(() => {
  const { handleGridClick, profileData } = useVM(ProfiledViewModel, {});
  if (!profileData) return null;
  const { avatarUrl, nickName } = profileData;

  return (
    <View className="profile-container">
      <AtAvatar circle className="avatar" image={avatarUrl} />
      <View className="at-article__h2">{nickName}</View>
      <AtGrid
        onClick={handleGridClick}
        hasBorder={false}
        data={[
          {
            image:
              'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
            value: '作品',
            url: 'PostList?type=self',
          },
          {
            image:
              'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
            value: '关注',
            url: 'UserList?userType=follow',
          },
          {
            image:
              'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
            value: '点赞',
            url: 'PostList?type=like',
          },
          {
            image:
              'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
            value: '粉丝',
            url: 'UserList?userType=fans',
          },
        ]}
      />
    </View>
  );
});

export { Profile };
