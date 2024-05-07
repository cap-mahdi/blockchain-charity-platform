import { CampainLayout } from './CompainLayout';
import { CommentPublish, Comment } from './comment';

export const CampaignFeed = () => {
  return (
    <CampainLayout>
      <div className="flex flex-col gap-6">
        <CommentPublish />
        <Comment />
      </div>
    </CampainLayout>
  );
};
