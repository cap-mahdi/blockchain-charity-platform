import { CompainLayout } from './CompainLayout';
import { CommentPublish, Comment } from './comment';

export const CampaignFeed = () => {
  return (
    <CompainLayout>
      <div className="flex flex-col gap-6 px-4 py-2">
        <CommentPublish />
        <Comment />
      </div>
    </CompainLayout>
  );
};
