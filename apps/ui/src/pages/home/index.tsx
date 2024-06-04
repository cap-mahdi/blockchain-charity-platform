import { ExpiringSoon } from './components/ExpiringSoon';
import { AvailableCompain } from './components/AvailableCompain';
import { StyledChart } from '../../components/chart/StyledChart';
import { Card } from '../../components/Card';
import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';

const GET_COMPAINS = gql`
  query GetCompains {
    campaignCreateds {
      id
      campaignAddress
      tokenAddress
      blockNumber
    }
  }
`;

export function HomePage(props) {
  const [loadData, comapainsItems] = useLazyQuery(GET_COMPAINS);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log('compainsItems', comapainsItems.data);
  }, [comapainsItems]);

  return (
    <div className="flex flex-col gap-4 w-[100%] justify-center items-center">
      <Card className="h-[25rem] p-8">
        <StyledChart />
      </Card>
      <ExpiringSoon />
      <AvailableCompain />
    </div>
  );
}
