import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { CharityCampaign } from '../typechain-types';

interface CampaignState {
  contract: CharityCampaign | null;
}
const initialState: CampaignState = {
  contract: null,
};

const CampaignContext = createContext({} as CampaignContextType);

interface CampaignProviderProps {
  children: React.ReactNode;
}

const CampaignProvider = ({ children }: CampaignProviderProps) => {
  const [state, setState] = useState<CampaignState>(initialState);
  return (
    <CampaignContext.Provider value={{ state, setState }}>
      {children}
    </CampaignContext.Provider>
  );
};
interface CampaignContextType {
  state: CampaignState;
  setState: Dispatch<SetStateAction<CampaignState>>;
}

const { Provider, Consumer } = CampaignProvider;

export default function useCampaignContext() {
  const { state, setState } = useContext(CampaignContext);
  return [state, setState] as [
    CampaignState,
    Dispatch<SetStateAction<CampaignState>>
  ];
}
export { CampaignProvider, useCampaignContext };
