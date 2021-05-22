import React from 'react';
import { Icon } from 'framework7-react';

const StarRating = ({ rating }) => (
  <div>
    {[...Array(rating)].map((star: number, index: number) => (
      <Icon f7="star_fill" key={Number(index)} size="20px" color="yellow" />
    ))}
  </div>
);

export default React.memo(StarRating);
