import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { ListViewModel } from './List.ViewModel';
import { FunctionComponent } from 'react';
import './List.scss';
import { NotifyListComponent } from '@/components/NotifyListComponent';

const List: FunctionComponent = observer(() => {
  const { data, handleScrollToLower } = useVM(ListViewModel, {});

  return (
    <NotifyListComponent data={data} onScrollToLower={handleScrollToLower} />
  );
});

export { List };
