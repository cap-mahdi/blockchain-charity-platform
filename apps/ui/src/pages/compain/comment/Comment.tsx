import { Card } from '../../../components/Card';
import { CommentContent } from './CommentContent';
import { CommentForm } from './CommentForm';
import { CommentReply } from './CommentReply';

export const Comment = () => {
  return (
    <Card className="w-full p-4">
      <CommentContent />
      <hr className="w-full border-1 border-light-gray" />
      <CommentReply />
      <CommentReply />
      <hr className="w-full border-1 border-light-gray" />
      <CommentForm mode="send" />
    </Card>
  );
};
