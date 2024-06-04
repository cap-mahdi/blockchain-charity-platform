import React, { useState } from 'react';
import { TextArea, TextField } from '../../components';
import { FilesUpload } from '../register/components/FilesUpload';

interface CampaignFormProps {
  onSubmit: (formData: any) => void;
}

export function CampaignForm({ onSubmit }: CampaignFormProps) {
  const [name, setName] = useState('name of the campaign');
  const [description, setDescription] = useState('description of the campaign');
  const [goal, setGoal] = useState('goal of the campaign');
  const [tokenName, setTokenName] = useState('Token name');
  const [tokenSymbol, setTokenSymbol] = useState('TTT');

  const [startDate, setStartDate] = useState('2002-12-12');
  const [endDate, setEndDate] = useState('2002-12-12');
  return (
    <div className="flex flex-col justify-start gap-2 w-full">
      <div className="flex flex-col gap-3 w-full items-start">
        <div className="flex flex-row gap-3 w-full justify-between">
          <TextField
            placeholder="Campaign Name"
            name="Campaign Name"
            reqiuired
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-3 w-full justify-between">
          <TextArea
            name="Description"
            height="h-40"
            placeholder="Description"
            required
            captionText="Write a few sentences about the campaign you intend to launch"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-3 w-full justify-between">
          <TextArea
            height="h-40"
            name="Goal"
            placeholder="Goal"
            required
            captionText="Share your goal with us"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-3 w-full justify-between">
          <TextField
            name="Token Name"
            placeholder="Token Name"
            reqiuired
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
          />
          <TextField
            name="Token Symbol"
            placeholder="TKN"
            reqiuired
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
          />
        </div>

        <hr className="w-full border-1 border-gray rounded-lg my-2" />
        <div className="flex flex-row gap-3 w-full justify-between">
          <TextField
            name="Start Date"
            reqiuired
            placeholder="YYYY/MM/DD"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            name="End Date"
            reqiuired
            placeholder="YYYY/MM/DD"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <FilesUpload
          title="Campaign Cover"
          description="Upload your campaign cover image here"
          displayIcon={false}
        />
        <FilesUpload
          title="White papaer and documents"
          description="Upload any files that you judge helpful for the campaign"
        />

        <div className="flex flex-row gap-2 item-start">
          <input type="checkbox" />
          <p>
            Agree to our{' '}
            <span className="text-orange">Terms & Conditions </span>
          </p>
        </div>
        <p className="text-xs text-dark-gray w-3/4">
          Note : All Information provided in this demand will be saved to
          blockchain to maintain transparency and it will be treated afterwords
          by our team. Be careful when filling this demand. Any cancellation
          will be treated by mail. You will be charged the transaction fees of
          deposing this demand.
        </p>
        <hr className="w-full border-1 border-gray rounded-lg" />
      </div>

      <div className="flex flex-row gap-3 w-full justify-end">
        <button className="bg-light-gray text-black py-3 px-4 text-xs  rounded-xl">
          Cancel{' '}
        </button>
        <button
          className="bg-orange text-black py-3 px-4 text-xs font-semibold rounded-xl"
          onClick={() => {
            const formData = {
              name,
              description,
              goal,
              tokenName,
              tokenSymbol,
              startDate,
              endDate,
            };
            setName('');
            setDescription('');
            setGoal('');
            setTokenName('');

            setTokenSymbol('');
            setStartDate('');
            setEndDate('');

            onSubmit(formData);
          }}
        >
          Submit{' '}
        </button>
      </div>
    </div>
  );
}
