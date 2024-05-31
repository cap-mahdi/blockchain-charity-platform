import { FC } from 'react';

interface ImageDisplayerProps {
  src: string;
  alt?: string;
}
export const ImageDisplayer: FC<ImageDisplayerProps> = ({ src, alt }) => {
  return (
    <div className="gap-1 h-60 ">
      <img src={src} alt={alt} />
    </div>
  );
};
