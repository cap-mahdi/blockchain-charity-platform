import React from 'react';
import { Card } from '../../../components/Card';
import { CompainCard } from '../../../components/compainCard/CompainCard';
import { Button } from '../../../components/Button';
import { FullBleedCarousel } from '../../../components/carousel/FullBleedCarousel';

export function ExpiringSoon(props) {
  return (
    <Card>
      <div className=" w-[96.5%] flex flex-col justify-start items-start flex-wrap gap-3 ">
        <Button className={'bg-orange'} disablePointer>
          Expiring Soon
        </Button>
        <div className=" w-[100%] flex flex-row justify-start items-start flex-wrap gap-5 ">
          <FullBleedCarousel>
            <CompainCard />
            <CompainCard />
            <CompainCard />
            <CompainCard />
            <CompainCard />
          </FullBleedCarousel>
        </div>
      </div>
    </Card>
  );
}
