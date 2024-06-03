import React from 'react';
import { AssociationType } from '../../../types/Association';
import { FiMaximize2 } from 'react-icons/fi';
import TextExpander from '../../../components/TextExpander';
import { BsCurrencyDollar } from 'react-icons/bs';

// interface Association {
//     name?: string,
//     description?:
//     string ,     email?:string,
//     country?: string,
//     streetAddress?: string,
//     city?: string,
//     state?: string,
//     postalCode?: string,
//     creationDate?:string,
//     size?: string,

//     status?: string,
//     ipfsHashes ?: string[]
//   }

export function AssociationCard({
  association,
}: {
  association: AssociationType;
}) {
  const styles = {
    wrapper: ` bg-beige flex flex-col h-[22rem] p-5 rounded-2xl box-border min-h-[100px]`,
    category: `text-light-blue text-[11px] font-medium `,
    name: `text-dark-gray font-bold   `,
    textExpander: `text-dark-gray text-xs font-medium mt-2 px-2`,
  };
  return (
    <div style={{ width: '23.5%' }} className={styles.wrapper}>
      <div className="flex flex-row justify-between">
        <div>
          {/* Category */}
          <h1 className={styles.category}>
            {association?.domain.toUpperCase()}
          </h1>
          {/* Compain Name */}
          <h1 className={styles.name}>{association?.name}</h1>
        </div>
        <FiMaximize2 className="w-4 h-4 text-dark-gray" />
      </div>

      {/* Photo Section */}
      <div className="relative my-2 w-full h-full ">
        {/* Association Photo */}
        <div className="relative w-full  inset-0 z-0">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/031/947/214/small_2x/silhouette-of-a-palestinian-man-waving-palestine-flag-over-people-photo.JPG"
            alt="Compain"
            className="w-full h-[10rem] rounded-2xl  inset-0 z-0"
          />
        </div>
      </div>

      {/* Description */}
      <TextExpander
        className={styles.textExpander}
        withChar={false}
        collapsedNumWords={20}
        buttonColor={'light-blue'}
      >
        {association?.description}
      </TextExpander>
    </div>
  );
}
