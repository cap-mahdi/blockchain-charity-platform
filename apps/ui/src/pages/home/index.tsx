import React from 'react';
import { ExpiringSoon } from './components/ExpiringSoon';
import { AvailableCompain } from './components/AvailableCompain';
import { FullBleedCarousel } from '../../components/carousel/FullBleedCarousel';
import { StyledChart } from '../../components/chart/StyledChart';
import { Card } from '../../components/Card';

export function HomePage(props) {
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
