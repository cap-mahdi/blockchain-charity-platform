import { Card } from '../../../components/Card';
import { CommentForm } from './CommentForm';

export const CommentPublish = () => (
  <Card className="w-full p-4">
    <CommentForm mode="publish" />
  </Card>
);
export * from './Comment';
