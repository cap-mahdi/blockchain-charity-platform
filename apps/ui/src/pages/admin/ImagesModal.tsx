import { FC, useState } from 'react';
import { Card } from '../../components/Card';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { Modal } from '../../components/Modal';
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface ImagesModalProps {
  images: string[];
  selectedImage: number;
  onClose?: () => void;
}
export const ImagesModal: FC<ImagesModalProps> = ({
  images,
  selectedImage,
  onClose,
}) => {
  const [selected, setSelected] = useState(selectedImage);

  return (
    <Modal onClose={onClose}>
      <Card className="!flex-row px-2">
        <div>
          <FaArrowAltCircleLeft
            onClick={() => {
              setSelected((selected - 1 + images.length) % images.length);
            }}
            className="cursor-pointer text-5xl"
          />
        </div>
        <div className="gap-1 h-5/6 ">
          <img src={images[selected]} alt="Current " />
        </div>
        <div>
          <FaArrowAltCircleRight
            onClick={() => {
              setSelected((selected + 1) % images.length);
            }}
            className="cursor-pointer text-5xl"
          />
        </div>
      </Card>
    </Modal>
  );
};
