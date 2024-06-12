import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Modal } from '../components/Modal';
import { Card } from '../components/Card';
import { toast } from 'react-toastify';
import axios from 'axios';
import { StepProgress } from '../components/StepProgress';

type MetaMaskState = {
  connectedWallet: string | null;
};
type MetaMaskContextType = MetaMaskState & {
  connectWallet: () => Promise<void>;
  signBeforeSendTransaction: (admin?: boolean) => Promise<any>;
  defineSteps: (steps: any) => void;
  nextStep: () => void;
  failedStep: () => void;
  terminate: (after?: () => any) => void;
};
const MetaMaskContext = createContext({} as MetaMaskContextType);

const initialState: MetaMaskState = {
  connectedWallet: null,
};

interface MetaMaskProviderProps {
  children: React.ReactNode;
}

const MetamaskProvider = ({ children }: MetaMaskProviderProps) => {
  const [state, setState] = useState<MetaMaskState>(initialState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState<null | number>(null);
  const [steps, setSteps] = useState([]);
  const [stepStatus, setStepStatus] = useState<'success' | 'failure'>(
    'success'
  );

  const connectWallet = async () => {
    console.log('connectWallet');
    try {
      if (window.ethereum) {
        setState({ ...state, connectedWallet: null });
        setIsDialogOpen(true);
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setState({ ...state, connectedWallet: accounts[0] });

        toast.success('Connected to MetaMask');
      } else {
        toast.error('Install MetaMask');
      }
    } catch (err) {
      console.error('Metmask', err);
      toast.error(
        'An error occured while connecting to MetaMask, Pleas Try Again'
      );
    }
    setIsDialogOpen(false);
  };

  const signBeforeSendTransaction = async (admin = false) => {
    if (!state.connectedWallet) {
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
    if (admin) {
      return await axios.post(
        `http://localhost:3000/api/auth/metamask/admin/login?address=${selectedAddress}`,
        { signature }
      );
    }
    return await axios.post(
      `http://localhost:3000/api/auth/metamask/login?address=${selectedAddress}`,
      { signature }
    );
  };
  const defineSteps = (steps: any) => {
    setSteps(steps);
    setSelectedStep(0);
    setStepStatus('success');
  };

  const nextStep = useCallback(() => {
    setSelectedStep((prev) => prev + 1);
  }, []);

  const terminate = (after = () => {}) => {
    setTimeout(() => {
      setSelectedStep(null);
      after();
    }, 1000);
  };

  const failedStep = () => {
    setStepStatus('failure');
    setTimeout(() => {
      setSelectedStep(null);
    }, 1000);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
        if (accounts.length > 0) {
          setState({ ...state, connectedWallet: accounts[0] });
        }
      });

      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setState({ ...state, connectedWallet: null });
          toast.info('Please connect to MetaMask.');
        } else {
          setState({ ...state, connectedWallet: accounts[0] });
          toast.success('Account changed successfully.');
        }
      });
    }
  }, []);

  return (
    <MetaMaskContext.Provider
      value={{
        ...state,
        connectWallet,
        signBeforeSendTransaction,
        defineSteps,
        nextStep,
        failedStep,
        terminate,
      }}
    >
      {!selectedStep && isDialogOpen && (
        <Modal onClose={() => setIsDialogOpen(false)}>
          <Card>Connecting to MetaMask....</Card>
        </Modal>
      )}
      {selectedStep && (
        <Modal>
          <StepProgress
            steps={steps}
            selectedStep={selectedStep}
            status={stepStatus}
          />
        </Modal>
      )}
      <div>{children}</div>
    </MetaMaskContext.Provider>
  );
};

export default function useMetaMask() {
  const data = useContext(MetaMaskContext);
  if (!data)
    throw new Error(
      'useCampaignContext must be used within a CampaignProvider'
    );
  return data;
}
export {
  MetamaskProvider as MetamaskContext,
  useMetaMask as useCampaignContext,
};
