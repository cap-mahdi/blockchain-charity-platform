import { useEffect, useState } from 'react';
import { Spinner } from '../../components/Spinner';
import { CompainLayout } from './CompainLayout';
import { CommentPublish, Comment } from './comment';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const CampaignFeed = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { campaignAddress } = useParams();
  useEffect(() => {
    if (!campaignAddress) return;
    axios
      .get(`http://localhost:3000/api/comment/${campaignAddress}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to fetch comments');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [campaignAddress]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <CompainLayout>
      <div className="flex flex-col gap-6 px-4 py-2 w-full">
        <CommentPublish />
        {/* {<Comment />} */}
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            content={comment.content}
            wallet={comment.walletAddress}
            createdAt={comment.createdAt}
          />
        ))}
      </div>
    </CompainLayout>
  );
};
