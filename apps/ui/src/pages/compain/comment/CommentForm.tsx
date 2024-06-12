import { FC, useState } from 'react';
import { TextArea } from '../../../components';
import { Button } from '../../../components/Button';
import useMetaMask from '../../../context/metamaskContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface CommentFormProps {
  mode: 'send' | 'publish';
}
export const CommentForm: FC<CommentFormProps> = ({ mode, getComments }) => {
  const { campaignAddress } = useParams();
  const [content, setContent] = useState('');
  const { connectWallet, connectedWallet } = useMetaMask();
  const publish = async () => {
    if (!connectedWallet) {
      await connectWallet();
    }
    const selectedAddress = window.ethereum.selectedAddress;
    console.log('Get nonce');
    const {
      data: { nonce },
    } = await axios.get(
      `http://localhost:3000/api/auth/metamask/nonce?address=${selectedAddress}`
    );
    console.log('nonce', nonce);
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [nonce, selectedAddress],
    });

    return await axios
      .post(`http://localhost:3000/api/comment?address=${selectedAddress}`, {
        content,
        campaignAddress,
        signature,
      })
      .then(() => {
        setContent('');
        getComments(campaignAddress);
      });
  };
  return (
    <div className="flex flex-row gap-3 justify-center items-start w-full">
      <img
        src="images/default-avatar.png"
        alt="avatar"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col gap-4  w-full">
        <TextArea
          placeholder={
            mode === 'publish' ? "What's on your mind?" : 'Type your reply'
          }
          className="h-24 border-gray placeholder:text-dark-gray "
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-3 justify-center items-start [&>*]:text-dark-gray [&>*]:cursor-pointer ">
            <UploadPhotoSVG />
            <AttachFileSVG />
            <EmoijiSVG />
          </div>
          <Button className="bg-blue text-white text-sm" onClick={publish}>
            {mode === 'publish' ? 'Post' : 'Send'}
          </Button>
        </div>
      </div>
    </div>
  );
};

const UploadPhotoSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );
};

const AttachFileSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
      />
    </svg>
  );
};

const EmoijiSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
      />
    </svg>
  );
};
