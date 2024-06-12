import { useEffect, useState } from 'react';
import { Spinner } from '../../components/Spinner';
import { CompainLayout } from './CompainLayout';
import { CommentPublish, Comment } from './comment';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export const CampaignFeed = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { campaignAddress } = useParams();
  const getComments = (campaignAddress) => {
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
  };
  useEffect(() => {
    if (!campaignAddress) return;
    getComments(campaignAddress);
  }, [campaignAddress]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <CompainLayout>
      <div className="flex flex-col gap-6 px-4 py-2 w-full">
        <CommentPublish getComments={getComments} />
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
      <div className="flex flex-row justify-start w-[100%]  p-2">
        <Link to={'/campaign/' + campaignAddress}>
          <Button className="bg-orange w-fit flex flex-row items-center gap-2">
            <FaLongArrowAltLeft className="w-6 h-6" />
            <p>Get back & Donate</p>
          </Button>
        </Link>
      </div>
    </CompainLayout>
  );
};
