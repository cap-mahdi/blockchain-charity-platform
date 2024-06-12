import { Card } from '../../../components/Card';
import { CommentForm } from './CommentForm';

export const CommentPublish = ({ getComments }) => (
  <Card className="w-full p-4">
    <CommentForm mode="publish" getComments={getComments} />
  </Card>
);
export * from './Comment';
