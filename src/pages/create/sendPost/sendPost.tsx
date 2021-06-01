import { observer } from 'mobx-react';
import { useVM } from '@/utils/index';
import { SendPostViewModel } from './sendPost.ViewModel';
import { FunctionComponent } from 'react';
import {
  AtForm,
  AtDivider,
  AtButton,
  AtTextarea,
  AtImagePicker,
  AtIcon,
} from 'taro-ui';
import { Text, View } from '@tarojs/components';
import './sendPost.scss';

const MAX_IMAGES_COUNT = 9;
const SOURCE_TYPE = ['camera', 'album'];
const SIZE_TYPE = ['original', 'compressed'];

const SendPost: FunctionComponent = observer(() => {
  const {
    handleAccessChange,
    handleImageUpload,
    files,
    handleChoseLocation,
    handleDescriptionChange,
    description,
    handleImageTap,
    handleSubmit,
    address,
    accessLabel,
  } = useVM<SendPostViewModel, {}>(SendPostViewModel, {});
  return (
    <AtForm className="container" onSubmit={handleSubmit}>
      <AtTextarea
        className="textArea"
        maxLength={200}
        height={200}
        placeholder="想法..."
        value={description}
        onChange={handleDescriptionChange}
        autoFocus
        count={false}
      />
      <AtImagePicker
        onChange={handleImageUpload}
        files={files}
        multiple
        count={MAX_IMAGES_COUNT}
        sourceType={SOURCE_TYPE}
        onImageClick={handleImageTap}
        sizeType={SIZE_TYPE}
      />
      <AtDivider />
      <View className="location">
        <AtIcon
          value="camera"
          color="#3F536E"
          onClick={handleChoseLocation}
          size="30"
        />
        <Text>{address}</Text>
      </View>
      <View className="location">
        <AtIcon
          value="eye"
          color="#3F536E"
          size="30"
          onClick={handleAccessChange}
        />
        <Text>{accessLabel}</Text>
      </View>
      <View className="buttons">
        <AtButton type="primary" formType="submit" onClick={handleSubmit}>
          提交
        </AtButton>
      </View>
    </AtForm>
  );
});

export { SendPost };
