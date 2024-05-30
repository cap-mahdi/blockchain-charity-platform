import { createContext, useContext, useState } from 'react';

interface CampaignState {
  contract: any;
}
const initialState: CampaignState = {
  contract: null,
};

const CampaignContext = createContext({});

interface ProjectProviderProps {
  children: React.ReactNode;
}

const CampaignProvider = ({ children }: CampaignProviderProps) => {
  const [state, setState] = useState(initialState);
  return (
    <CampaignContext.Provider value={{ state, setState }}>
      {children}
    </CampaignContext.Provider>
  );
};

const { Provider, Consumer } = CampaignProvider;

export default function useCampaignContext() {
  const { state, setState } = useContext(CampaignContext);
  return [state, setState];
}
export { CampaignProvider, useCampaignContext };
