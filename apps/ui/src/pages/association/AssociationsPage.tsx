import React from 'react';
import { Card } from '../../components/Card';
import { FormHeader } from '../../components/Form/FormHeader';
import { AssociationCard } from './components/AssociationCard';
import { domain } from '@snapshot-labs/snapshot.js/dist/sign';

const associations = [
  {
    name: 'Tech Innovators Association',
    description:
      'A global network of professionals dedicated to advancing technology and innovation.',
    email: 'contact@techinnovators.org',
    country: 'United States',
    streetAddress: '1234 Innovation Drive',
    city: 'Silicon Valley',
    state: 'California',
    postalCode: '94027',
    creationDate: '2012-05-15',
    size: '5000',
    domain: 'Art & Culture',

    status: 'Active',
  },
  {
    name: 'Health Professionals Network',
    description:
      'An international organization focused on healthcare advancements and professional development.',
    email: 'info@healthpro.org',
    country: 'Canada',
    streetAddress: '5678 Wellness Ave',
    city: 'Toronto',
    state: 'Ontario',
    postalCode: 'M5G 1L5',
    creationDate: '2008-09-23',
    size: '3000',
    domain: 'Art & Culture',

    status: 'Active',
  },
  {
    name: 'Global Environmental Advocates',
    description:
      'A coalition of environmentalists working towards sustainable development and conservation.',
    email: 'support@greenadvocates.org',
    country: 'Germany',
    streetAddress: '91011 Eco Street',
    city: 'Berlin',
    state: 'Berlin',
    postalCode: '10115',
    creationDate: '2015-03-11',
    size: '1200',
    domain: 'Art & Culture',

    status: 'Active',
  },
  {
    name: 'Education for All Foundation',
    description:
      'Dedicated to improving access to education worldwide through community projects and scholarships.',
    email: 'contact@edforall.org',
    country: 'India',
    streetAddress: '1213 Knowledge Park',
    city: 'New Delhi',
    state: 'Delhi',
    postalCode: '110001',
    creationDate: '2010-07-30',
    size: '8000',
    domain: 'Art & Culture',

    status: 'Active',
  },
  {
    name: 'Art & Culture Society',
    description:
      'Promoting art and culture through exhibitions, workshops, and cultural exchange programs.',
    email: 'info@artculture.org',
    country: 'France',
    streetAddress: '1415 Museum Road',
    city: 'Paris',
    state: 'Île-de-France',
    postalCode: '75001',
    creationDate: '2005-11-18',
    size: '4500',
    domain: 'Art & Culture',
    status: 'Active',
  },
];

export function AssociationsPage(props) {
  return (
    <Card>
      <FormHeader
        title="Associations"
        subTitle="Here you can go throught all the available associations"
      />

      <div
        style={{
          rowGap: '1rem',
        }}
        className=" w-[96.5%] flex flex-row justify-start items-start flex-wrap gap-[2%]  "
      >
        {' '}
        {associations.map((association) => (
          <AssociationCard association={association} />
        ))}
      </div>
    </Card>
  );
}
