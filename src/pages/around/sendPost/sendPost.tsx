import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { SendPostViewModel } from './sendPost.ViewModel';
import { FunctionComponent } from 'react';
import {
  AtForm,
  AtInput,
  AtButton,
  AtTextarea,
  AtImagePicker,
  AtSwitch,
} from 'taro-ui';
import { Map } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';

const chooseLocation = Taro.requirePlugin('chooseLocation');

const SendPost: FunctionComponent = observer(() => {
  const {
    location,
    handleImageUpload,
    files,
    markers,
    handleMapTap,
    handleSearch,
    title,
    handleTitleChange,
    handleDescriptionChange,
    description,
  } = useVM<SendPostViewModel, {}>(SendPostViewModel, {});
  useDidShow(() => {
    handleMapTap({
      detail: chooseLocation.getLocation(),
    });
  });
  return (
    <AtForm>
      <AtInput
        name="value"
        title="标题"
        type="text"
        placeholder="单行文本"
        value={title}
        onChange={handleTitleChange}
      />
      <AtTextarea
        maxLength={200}
        placeholder="你的问题是..."
        value={description}
        onChange={handleDescriptionChange}
      />
      <AtImagePicker onChange={handleImageUpload} files={files} />
      <AtButton type="primary" onClick={handleSearch}>
        搜索
      </AtButton>
      <Map markers={markers} {...location} onTap={handleMapTap} />
      <AtSwitch title="公开" />
      <AtButton type="primary" formType="submit">
        提交
      </AtButton>
      <AtButton formType="reset">重置</AtButton>
    </AtForm>
  );
});

export { SendPost };
