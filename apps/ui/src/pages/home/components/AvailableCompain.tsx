import React from 'react';
import { Card } from '../../../components/Card';
import { CompainCard } from '../../../components/compainCard/CompainCard';

export function AvailableCompain(props) {
  return (
    <Card>
      <div className=" w-[96.5%] flex flex-row justify-start items-start flex-wrap gap-5 ">
        {Array.from({ length: 10 }).map((el, i) => (
          <CompainCard key={i} />
        ))}
      </div>
    </Card>
  );
}
