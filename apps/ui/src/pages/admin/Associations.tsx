import { FC } from 'react';
import { Card } from '../../components/Card';
import { Link } from 'react-router-dom';
import { TbListDetails } from 'react-icons/tb';
import { Pagination } from '../../components/Pagination';
import { Status } from '../../components/Status';

const associations = [
  {
    name: 'Name 1',
    about:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet iste temporibus hic, beatae cumque veniam, molestias ad debitis blanditiis odio facere voluptatem vero reprehenderit a exercitationem earum! Eos, nam quod.',
    email: 'email@gmail.com',
    country: 'Tunisia',
    status: 'Pending',
  },
  {
    name: 'Name 1',
    about:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet iste temporibus hic, beatae cumque veniam, molestias ad debitis blanditiis odio facere voluptatem vero reprehenderit a exercitationem earum! Eos, nam quod.',
    email: 'email@gmail.com',
    country: 'Tunisia',
    status: 'Accepted',
  },
  {
    name: 'Name 1',
    about:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet iste temporibus hic, beatae cumque veniam, molestias ad debitis blanditiis odio facere voluptatem vero reprehenderit a exercitationem earum! Eos, nam quod.',
    email: 'email@gmail.com',
    country: 'Tunisia',
    status: 'Refused',
  },
  {
    name: 'Name 1',
    about:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet iste temporibus hic, beatae cumque veniam, molestias ad debitis blanditiis odio facere voluptatem vero reprehenderit a exercitationem earum! Eos, nam quod.',
    email: 'email@gmail.com',
    country: 'Tunisia',
    status: 'Pending',
  },
  {
    name: 'Name 1',
    about:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet iste temporibus hic, beatae cumque veniam, molestias ad debitis blanditiis odio facere voluptatem vero reprehenderit a exercitationem earum! Eos, nam quod.',
    email: 'email@gmail.com',
    country: 'Tunisia',
    status: 'Accepted',
  },
  {
    name: 'Name 1',
    about:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet iste temporibus hic, beatae cumque veniam, molestias ad debitis blanditiis odio facere voluptatem vero reprehenderit a exercitationem earum! Eos, nam quod.',
    email: 'email@gmail.com',
    country: 'Tunisia',
    status: 'Refused',
  },
];

export const Associations: FC = () => {
  return (
    <Card className="items-start py-5">
      <h1 className="text-2xl font-extrabold">Associations</h1>
      <div className="flex flex-col">
        <div className="flex flex-row py-2 px-3">
          <h3 className="w-1/12 p-1 font-extrabold">Name</h3>
          <h3 className="w-4/12 p-1  font-extrabold">About</h3>
          <h3 className="w-2/12 p-1 font-extrabold">Email</h3>
          <h3 className="w-2/12 p-1 font-extrabold">Country</h3>
          <h3 className="w-2/12 p-1 font-extrabold">Status</h3>
          <p className="w-1/12 p-1 font-extrabold"></p>
        </div>
        {associations.map((association, index) => (
          <div
            key={index}
            className={`flex flex-row justify-start ${
              index % 2 && 'bg-light-gray'
            } py-2 px-3`}
          >
            <p className="w-1/12 p-1">{association.name}</p>
            <p className="w-4/12 p-1">
              {association.about.length > 100
                ? association.about.slice(0, 100) + '...'
                : association.about}
            </p>
            <p className="w-2/12 p-1">{association.email}</p>
            <p className="w-2/12 p-1">{association.country}</p>
            <Status status={association.status} />
            <p className="w-1/12  p-1 flex justify-center text-lg">
              <Link to={`/admin/association/${index}`}>
                <TbListDetails />
              </Link>
            </p>
          </div>
        ))}
      </div>
      <Pagination />
    </Card>
  );
};
