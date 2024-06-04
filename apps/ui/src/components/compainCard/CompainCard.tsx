import React from 'react';
import { ProgressBar } from '../ProgressBar';
import { FiMaximize2 } from 'react-icons/fi';
import { BsCurrencyDollar } from 'react-icons/bs';

import TextExpander from '../TextExpander';
import { Link } from 'react-router-dom';

interface PropsType {
  width: string | number;
  height: string | number;
  category: string;
  compainName: string;
  description: string;
  campaign: any;
}

export function CompainCard({
  width = 'min-content',
  height = 'min-content',
  category = 'Humanitarian',
  compainName = '#Free_Palestine',
  description = 'Rebuilding Alliance is dedicated to advancing equal rights for Palestinians through education, advocacy, and support that assures Palestinian families the right to a home, schooling, economic security, safety, and a promising future.',
  campaign,
}: PropsType) {
  const styles = {
    wrapper: ` bg-beige p-5 rounded-2xl box-border `,
    category: `text-light-blue text-[11px] font-medium `,
    compainName: `text-dark-gray font-bold   `,
    textExpander: `text-dark-gray text-xs font-medium mt-2 px-2`,
  };
  return (
    <div style={{ height, width }} className={styles.wrapper}>
      <div className="flex flex-row justify-between">
        <div>
          {/* Category */}
          <h1 className={styles.category}>{category.toUpperCase()}</h1>
          {/* Compain Name */}
          <h1 className={styles.compainName}>{campaign?.title}</h1>
        </div>
        <Link to={`/campaign/${campaign?.campaignAddress}`}>
          <FiMaximize2 className="w-4 h-4 text-dark-gray" />
        </Link>
      </div>

      {/* Photo Section */}
      <div className="relative my-2 w-full h-full ">
        {/* Association Photo */}
        <div className="absolute w-full bottom-[85%] left-[90%] z-10">
          <img
            src="https://www.croissant-rouge.tn/logo.png"
            alt="Association"
            className="w-10 h-10 rounded-full  "
          />
        </div>
        {/* Compain Photo */}
        <div className="relative w-full  inset-0 z-0">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/031/947/214/small_2x/silhouette-of-a-palestinian-man-waving-palestine-flag-over-people-photo.JPG"
            alt="Compain"
            className="w-full h-[10rem] rounded-2xl  inset-0 z-0"
          />
        </div>
      </div>

      {/* ProgressBar */}
      <ProgressBar
        label={{ text: '3 days 2 hours 45 minutes left', size: 10 }}
        percentage={campaign?.percentage < 100 ? campaign?.percentage : 100}
      />

      {/* Description */}

      {campaign?.description ? (
        <TextExpander
          className={styles.textExpander}
          withChar={false}
          collapsedNumWords={20}
          buttonColor={'light-blue'}
        >
          {campaign?.description}
        </TextExpander>
      ) : (
        ''
      )}

      {/* Donation Section */}

      <div className="flex flex-row justify-between mt-2">
        <div className="flex flex-row">
          <div className="w-8 h-8 bg-light-gray bg-opacity-30 rounded-md border-[1px] border-[#b8d2de50] flex justify-center items-center">
            <BsCurrencyDollar className="text-dark-gray font-bold" />
          </div>
          <div className="ml-1">
            <h1 className="text-[8px] font-medium text-light-blue ">
              TOTAL RAISED
            </h1>
            <h1 className="text-[14px] font-bold leading-[0.7rem] text-dark-gray">
              {campaign?.totalDonations}
            </h1>
          </div>
        </div>
        <Link to={`/campaign/${campaign?.campaignAddress}`}>
          <button
            className={`w-50% bg-blue text-white font-semibold text-[13px] py-2 px-4 rounded-lg`}
          >
            Donate Now
          </button>
        </Link>
      </div>
    </div>
  );
}
