import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { ReportButtonViewModel } from './ReportButton.ViewModel';
import { FunctionComponent } from 'react';
import './ReportButton.scss';
import { AtIcon } from 'taro-ui';

const ReportButton: FunctionComponent = observer(() => {
  useVM(ReportButtonViewModel, {});

  return <AtIcon value="blocked" />;
});

export { ReportButton };
