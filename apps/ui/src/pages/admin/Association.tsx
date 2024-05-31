import { FC, useState } from 'react';
import { Card } from '../../components/Card';
import { InfoDisplayer } from '../../components/InfoDisplayer';
import { Status } from '../../components/Status';
import { Avatar } from '../../components/Avatar';
import { ImagesModal } from './ImagesModal';
const association = {
  name: 'Association Name',
  about:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi esse culpa tenetur enim sunt fuga tempore, voluptatibus cupiditate facilis quis aut est consequatur nihil nisi nesciunt aliquid magnam expedita harum!',
  email: 'a@gmail.com',
  phoneNumber: '1234567890',
  country: 'India',
  streetAddress: 'street Address',
  city: 'Sfax',
  state: 'Taniour',
  zip: '123456',
  creationDate: '2021-09-01',
  size: 5,
  domain: 'www.association.com',
};
export const Association: FC = () => {
  const [selectedImage, setSelectedImage] = useState<null | number>(2);
  return (
    <Card>
      <h1 className="text-2xl font-semibold text-gray-900">
        Association Details
      </h1>
      <div className="flex flex-col gap-5 w-full items-start">
        <div className="flex flex-row gap-5 w-full justify-start items-center font-semibold ">
          <Avatar src="/images/default-avatar.png" />
          <p>{association.name}</p>
        </div>
        <div className="flex flex-row gap-5 w-full justify-start">
          <Status status="Pending" />
        </div>

        <div className="flex flex-row gap-5 w-full justify-start">
          <InfoDisplayer
            label="About"
            value={association.about}
            direction="col"
          />
        </div>
        <div className="flex flex-row gap-5 w-full justify-start">
          <InfoDisplayer label="Email" value={association.email} />
          <InfoDisplayer label="Phone Number" value={association.phoneNumber} />
          <InfoDisplayer label="Country" value={association.country} />
        </div>
        <div className="flex flex-row gap-5 w-full justify-start">
          <InfoDisplayer
            label="Street Address"
            value={association.streetAddress}
          />
          <InfoDisplayer label="City" value={association.city} />
          <InfoDisplayer label="State / Province" value={association.state} />
          <InfoDisplayer label="Zip / Postal Code" value={association.zip} />
        </div>
        <hr className="w-full border-1 border-gray rounded-lg my-2" />
        <div className="flex flex-row gap-5 w-full justify-start">
          <InfoDisplayer
            label="Creation Date"
            value={association.creationDate}
          />

          <InfoDisplayer label="Association Size" value={association.size} />
          <InfoDisplayer
            label="Association Domain"
            value={association.domain}
          />
        </div>
        <div className="rounded-lg border-1 border-dashed border-black p-2  w-full text-gray-900  sm:text-sm sm:leading-6 flex flex-row items-center gap-4 flex-wrap">
          {Array.from({ length: 10 }).map((_, index) => (
            <img
              key={index}
              className="w-60 cursor-pointer"
              src="images/post-image.png"
              alt="files icon upload"
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {selectedImage != null && (
        <ImagesModal
          images={[
            'images/post-image.png',
            'images/post-image.png',
            'images/post-image.png',
            'images/post-image.png',
          ]}
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
      <div className="flex flex-row gap-3 w-full justify-end">
        <button
          className="bg-red-500 text-black py-3 px-4 text-xs font-semibold rounded-xl "
          type="button"
        >
          Refuse{' '}
        </button>
        <button
          className="bg-green-500 text-black py-3 px-4 text-xs font-semibold rounded-xl"
          type="button"
        >
          Approve{' '}
        </button>
      </div>
    </Card>
  );
};
