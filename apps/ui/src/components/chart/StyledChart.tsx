import React from 'react';
import useDemoConfig from './useDemoConfig';
import { AxisOptions, Chart } from 'react-charts';

export function StyledChart(props) {
  type DailyStars = {
    date: Date;
    stars: number;
  };

  type Series = {
    label: string;
    data: DailyStars[];
  };

  const data = [
    {
      label: 'Series 1',
      data: [
        { primary: '22-02-03', likes: 130 },
        { primary: '22-03-03', likes: 150 },
        { primary: '22-04-03', likes: 120 },
        { primary: '22-05-03', likes: 140 },
        { primary: '22-06-03', likes: 160 },
        { primary: '22-07-03', likes: 180 },
        { primary: '22-08-03', likes: 170 },
        { primary: '22-09-03', likes: 190 },
        { primary: '22-10-03', likes: 200 },
        { primary: '22-11-03', likes: 220 },
        { primary: '22-12-03', likes: 250 },
        { primary: '23-01-03', likes: 280 },
        { primary: '23-02-03', likes: 300 },
        { primary: '23-03-03', likes: 320 },
        { primary: '23-04-03', likes: 340 },
        { primary: '23-05-03', likes: 360 },
        { primary: '23-06-03', likes: 380 },
        { primary: '23-07-03', likes: 350 },
        { primary: '23-08-03', likes: 300 },
        { primary: '23-09-03', likes: 200 },
      ],
    },
  ];
  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum: { primary: string }) => datum.primary,
    }),
    []
  );
  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum: { likes: number }) => datum.likes,
        elementType: 'area',
      },
    ],
    []
  );

  return (
    <div className="h-[30rem] w-full">
      <Chart
        elementType="area"
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
        r
      />
    </div>
  );
}

function MyChart({
  elementType,
  activeDatumIndex,
  activeSeriesIndex,
  setState,
}: any) {
  const { data, interactionMode, randomizeData } = useDemoConfig({
    series: 4,
    interactionMode: 'primary',
    dataType: 'ordinal',
    show: ['elementType', 'interactionMode'],
  });

  const primaryAxis = React.useMemo<
    AxisOptions<(typeof data)[number]['data'][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<(typeof data)[number]['data'][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
        elementType,
      },
    ],
    [elementType]
  );

  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />

      <Chart
        options={{
          data,
          interactionMode,
          primaryAxis,
          secondaryAxes,
          getDatumStyle: (datum, status) =>
            (activeDatumIndex === datum.index &&
            activeSeriesIndex === datum.seriesIndex
              ? {
                  opacity: 1,
                  circle: {
                    r: 5,
                  },
                  rectangle: {
                    stroke: 'black',
                    strokeWidth: 3,
                  },
                }
              : activeDatumIndex === datum.index
              ? {
                  opacity: 1,
                  circle: {
                    r: 3,
                  },
                  rectangle: {
                    stroke: 'black',
                    strokeWidth: 1,
                  },
                }
              : datum.seriesIndex === activeSeriesIndex
              ? {
                  circle: {
                    r: 3,
                  },
                  rectangle: {
                    stroke: 'black',
                    strokeWidth: 1,
                  },
                }
              : status === 'groupFocused'
              ? {
                  circle: {
                    r: 2,
                  },
                  rectangle: {
                    stroke: 'black',
                    strokeWidth: 0,
                  },
                }
              : {
                  circle: {
                    r: 2,
                  },
                  rectangle: {
                    stroke: 'black',
                    strokeWidth: 0,
                  },
                }) as any,
          getSeriesStyle: (series) => {
            return {
              color: `url(#${series.index % 4})`,
              opacity:
                activeSeriesIndex > -1
                  ? series.index === activeSeriesIndex
                    ? 1
                    : 0.3
                  : 1,
            };
          },
          onFocusDatum: (focused) =>
            setState({
              activeSeriesIndex: focused ? focused.seriesIndex : -1,
              activeDatumIndex: focused ? focused.index : -1,
            }),

          renderSVG: () => (
            <defs>
              <linearGradient id="0" x1="0" x2="0" y1="1" y2="0">
                <stop offset="0%" stopColor="#" />
                <stop offset="100%" stopColor="#" />
              </linearGradient>
              <linearGradient id="1" x1="0" x2="0" y1="1" y2="0">
                <stop offset="0%" stopColor="#ff8f10" />
                <stop offset="100%" stopColor="#ff3434" />
              </linearGradient>
              <linearGradient id="2" x1="0" x2="0" y1="1" y2="0">
                <stop offset="0%" stopColor="#42E695" />
                <stop offset="100%" stopColor="#3BB2B8" />
              </linearGradient>
              <linearGradient id="3" x1="0" x2="0" y1="1" y2="0">
                <stop offset="0%" stopColor="#ffb302" />
                <stop offset="100%" stopColor="#ead700" />
              </linearGradient>
            </defs>
          ),
        }}
      />
    </>
  );
}
