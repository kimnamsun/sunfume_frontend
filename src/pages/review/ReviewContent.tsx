import React from 'react';
import { Card, CardContent } from 'framework7-react';
import StarRating from './StarRating';

const ReviewContent = ({ content, rating }: { content: string; rating: number }) => (
  <>
    <Card className="mx-0 mb-1">
      <CardContent className="p-1 px-2">
        <p className="font-bold pt-1">{content}</p>
        <div className="flex pt-2">
          <StarRating rating={rating} />
        </div>
      </CardContent>
    </Card>
  </>
);

export default React.memo(ReviewContent);
