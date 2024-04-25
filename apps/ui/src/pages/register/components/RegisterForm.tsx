import { TextArea, TextField } from '../../../components';
import { FC } from 'react';
import { ProfileImageUpload } from './ProfileImageUpload';
import { FilesUpload } from './FilesUpload';

export const RegisterForm: FC = () => {
  return (
    <div className="flex flex-col justify-start gap-2 w-full">
      <div className="flex flex-col gap-3 w-full items-start">
        <div className="flex flex-row gap-3 w-full justify-between">
          <TextField name="Association Name" reqiuired />
        </div>
        <div className="flex flex-row gap-3 w-full justify-between">
          <TextArea
            name="About"
            required
            captionText="Write a few sentences about your association"
          />
        </div>
        <div className="flex flex-row gap-3 w-full justify-between">
          <TextField name="Email" type="email" reqiuired />
          <TextField name="Phone Number" reqiuired />
        </div>
        <div className="flex flex-row gap-3 w-2/3 justify-between">
          <TextField name="Country" reqiuired />
        </div>
        <div className="flex flex-row gap-3 w-full justify-between">
          <TextField name="Street Address" reqiuired />
        </div>
        <div className="flex flex-row gap-3 w-full justify-between">
          <TextField name="City" reqiuired />
          <TextField name="State / Province" reqiuired />
          <TextField name="Zip / Postal Code" reqiuired type="number" />
        </div>
        <hr className="w-full border-1 border-gray rounded-lg my-2" />
        <div className="flex flex-row gap-3 w-full justify-between">
          <TextField
            name="Creation Date"
            reqiuired
            placeholder="YYYY/MM/DD"
            type="date"
          />
          <TextField name="Association Size" reqiuired type="number" />
        </div>
        <div className="flex flex-row gap-3 w-full items-end">
          <TextField name="Domain" reqiuired />
          <ProfileImageUpload />
        </div>
        <FilesUpload />
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
        <button className="bg-orange text-black py-3 px-4 text-xs font-semibold rounded-xl">
          Submit{' '}
        </button>
      </div>
    </div>
  );
};
