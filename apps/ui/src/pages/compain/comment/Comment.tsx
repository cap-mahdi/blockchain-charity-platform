import { FC } from 'react';
import { Card } from '../../../components/Card';
import { CommentContent } from './CommentContent';

interface CommentProps {
  content: string;
  wallet: string;
  createdAt: Date;
}
export const Comment: FC<CommentProps> = ({ content, wallet, createdAt }) => {
  return (
    <Card className="w-full p-4">
      <CommentContent content={content} wallet={wallet} createdAt={createdAt} />
      {/* <hr className="w-full border-1 border-light-gray" />
      <CommentReply />
      <CommentReply />
      <hr className="w-full border-1 border-light-gray" />
      <CommentForm mode="send" /> */}
    </Card>
  );
};
