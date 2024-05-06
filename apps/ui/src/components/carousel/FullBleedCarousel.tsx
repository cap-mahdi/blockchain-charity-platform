import React from 'react';
import { CompainCard } from '../compainCard/CompainCard';

export function FullBleedCarousel({ children }) {
  return (
    <div className="carousel carousel-center w-  space-x-4 bg-neutral rounded-box">
      {React.Children.map(children, (child, i) => {
        return (
          <div className="carousel-item" key={`expiring-soon-carousel-${i}`}>
            {child}
          </div>
        );
      })}
    </div>
  );
}
