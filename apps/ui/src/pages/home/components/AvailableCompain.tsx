import React from 'react';
import { Card } from '../../../components/Card';
import { CompainCard } from '../../../components/compainCard/CompainCard';
import { Link } from 'react-router-dom';

export function AvailableCompain({ campaigns }) {
  return (
    <Card>
      <div className=" w-[96.5%] flex flex-row justify-start items-start flex-wrap gap-5 ">
        {campaigns.map((campaign, i) => (
          <CompainCard key={i} campaign={campaign} />
        ))}
      </div>
    </Card>
  );
}
