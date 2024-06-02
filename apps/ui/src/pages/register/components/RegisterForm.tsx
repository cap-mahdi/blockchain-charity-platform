import { TextArea, TextField } from '../../../components';
import { FC, FormEvent, useState } from 'react';
import { ProfileImageUpload } from './ProfileImageUpload';
import { FilesUpload } from './FilesUpload';
import { plateformContractAddress } from '../../../constants';
import { listenForTransactionMine, uploadToIpfs } from '../../../helper';
import { ethers } from 'ethers';
import {
  AssociationFactory,
  PlateformContract,
  PlateformContract__factory,
} from '../../../typechain-types';
import useMetaMask from '../../../context/metamaskContext';
import { toast } from 'react-toastify';

export const RegisterForm: FC = () => {
  const [name, setName] = useState('Name');
  const [about, setAbout] = useState('about');
  const [email, setEmail] = useState('Email@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('Phone Number');
  const [country, setCountry] = useState('Country');
  const [streetAddress, setStreetAddress] = useState('Street Address');
  const [city, setCity] = useState('City');
  const [state, setState] = useState('State / Province');
  const [zip, setZip] = useState('Zip / Postal Code');
  const [creationDate, setCreationDate] = useState('2002-12-12');
  const [associationSize, setAssociationSize] = useState(5);
  const [domain, setDomain] = useState('Domain');
  const [files, setFiles] = useState<File[]>([]);
  const { defineSteps, nextStep, failedStep, terminate } = useMetaMask();

  const register = async (e: FormEvent) => {
    console.log('Register');
    e.preventDefault();

    if (typeof window.ethereum !== 'undefined') {
      defineSteps([
        {
          title: 'Step 1',
          description: 'Register',
        },
        {
          title: 'Step 2',
          description: 'Upload Documents',
        },
        {
          title: 'Step 3',
          description: 'Sending Transaction',
        },
        {
          title: 'Step 4',
          description: 'Verification',
        },
      ]);
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const contract: PlateformContract = new ethers.Contract(
          plateformContractAddress,
          PlateformContract__factory.abi,
          signer
        );
        console.log('Step 1');
        nextStep();
        const hashes = await uploadToIpfs(files);
        console.log('Step 2');
        nextStep();
        console.log(
          'MetaMask is installed!',
          hashes.map((hash) => hash.data.IpfsHash)
        );
        const transactionResponse = await contract.addDemand(
          name,
          about,
          email,
          phoneNumber,
          country,
          streetAddress,
          city,
          state,
          zip,
          new Date(creationDate).getTime(),
          associationSize,
          domain,
          hashes.map((hash) => hash.data.IpfsHash)
        );
        console.log('Step 3');
        nextStep();
        await listenForTransactionMine(transactionResponse, provider);
        nextStep();
        terminate();
      } catch (error) {
        console.error('Metmask', error);
        failedStep();
        toast.error('An error occured Pleas Try Again');
      }
    } else {
      toast.error('Install MetaMask');
    }
  };
  return (
    <form
      className="flex flex-col justify-start gap-2 w-full"
      onSubmit={register}
    >
      <div className="flex flex-col gap-3 w-full items-start">
        <div className="flex flex-row gap-3 w-full justify-between">
          <TextField
            name="Association Name"
            reqiuired
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-3 w-full justify-between">
          <TextArea
            name="About"
            required
            captionText="Write a few sentences about your association"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-3 w-full justify-between">
          <TextField
            name="Email"
            type="email"
            reqiuired
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            name="Phone Number"
            reqiuired
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-3 w-2/3 justify-between">
          <TextField
            name="Country"
            reqiuired
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-3 w-full justify-between">
          <TextField
            name="Street Address"
            reqiuired
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-3 w-full justify-between">
          <TextField
            name="City"
            reqiuired
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            name="State / Province"
            reqiuired
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <TextField
            name="Zip / Postal Code"
            reqiuired
            type="number"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
        <hr className="w-full border-1 border-gray rounded-lg my-2" />
        <div className="flex flex-row gap-3 w-full justify-between">
          <TextField
            name="Creation Date"
            reqiuired
            placeholder="YYYY/MM/DD"
            type="date"
            value={creationDate}
            onChange={(e) => setCreationDate(e.target.value)}
          />
          <TextField
            name="Association Size"
            reqiuired
            type="number"
            value={associationSize}
            onChange={(e) => setAssociationSize(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-3 w-full items-end">
          <TextField
            name="Domain"
            reqiuired
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <ProfileImageUpload />
        </div>
        <FilesUpload
          title={'Attach legal files *'}
          description="Upload any legal Document or File that may be helpful in the process"
          files={files}
          setFiles={setFiles}
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
        <button
          className="bg-light-gray text-black py-3 px-4 text-xs  rounded-xl"
          type="reset"
        >
          Cancel{' '}
        </button>
        <button className="bg-orange text-black py-3 px-4 text-xs font-semibold rounded-xl">
          Submit{' '}
        </button>
      </div>
    </form>
  );
};
