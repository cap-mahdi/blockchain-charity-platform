import { IoMdTime } from 'react-icons/io';
import { FaRegHeart } from 'react-icons/fa6';

export const CommentContent = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row gap-4 items-center">
        <img
          src="images/default-avatar.png"
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />{' '}
        <div className="flex flex-col gap-2">
          <p className="font-medium text-sm">
            Med Gdoura <span className="font-normal">updates his status</span>
          </p>
          <p className="flex flex-row gap-2 items-center text-dark-gray text-xs font-medium">
            <IoMdTime size="25" />
            <span>35 minutes ago</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p>Hey guys! What's your favorite framework?</p>
        <img src="images/post-image.png" alt="post" />
      </div>
      <p className="flex flex-row gap-2 items-center text-black font-secondary text-sm">
        <FaRegHeart color="red" size="20" />
        <span>1</span>
      </p>
    </div>
  );
};