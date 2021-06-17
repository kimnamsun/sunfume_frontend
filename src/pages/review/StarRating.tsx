import React from 'react';
import { Icon } from 'framework7-react';

const StarRating = ({ rating }: { rating: number }) => (
  <>
    {[...Array(rating)].map((index: number) => (
      <Icon f7="star_fill" key={Number(index)} size="20px" color="yellow" />
    ))}
  </>
);

export default React.memo(StarRating);
