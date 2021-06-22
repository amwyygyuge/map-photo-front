import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import {
  UserListViewModel,
  UserListViewModelViewModelProps,
} from './UserList.ViewModel';
import { FunctionComponent } from 'react';
import { UserListComponent } from '@/components/UserListComponent';

const UserList: FunctionComponent<UserListViewModelViewModelProps> = observer(
  (props) => {
    const { data, handleScrollToLower, handleAvatarClick } = useVM(
      UserListViewModel,
      props,
    );
    return (
      <UserListComponent
        data={data}
        onAvatarClick={handleAvatarClick}
        onScrollToLower={handleScrollToLower}
      />
    );
  },
);

export { UserList };
