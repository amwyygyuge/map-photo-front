import { computed } from 'mobx';
import { getModule, IMAGE_MODULE, ImageModule } from '@/SDK/index';
import { getProfileController } from '@/controller/ProfileController';
import { ViewModel } from '@/utils/index';
import { PostWithUser } from '@/utils/RequestType';

export type PostDetailProps = {
  post: PostWithUser;
};
export class PostDetailViewModel extends ViewModel<PostDetailProps> {
  _imageModule = getModule<ImageModule>(IMAGE_MODULE);

  profileController = getProfileController();

  preViewImage = (current: string) => {
    this._imageModule.previewImage([], current);
  };
}
