import React from 'react';
import { Card, CardHeader, CardContent, Link } from 'framework7-react';
import { currency } from '@js/utils';
import LikeBtn from '@components/LikeBtn';

const Product = ({
  id,
  name,
  price,
  image,
  isLike,
}: {
  id: number;
  name: string;
  price: number;
  image: string;
  isLike: boolean;
}) => (
  <Card noShadow className="w-full m-0">
    <CardHeader className="p-0 relative">
      <Link href={`/items/${id}`}>
        <img alt="itemImage" className="w-full h-44 rounded-md object-cover" src={image} />
      </Link>
      <LikeBtn type="product" id={id} isLike={isLike} />
    </CardHeader>
    <CardContent className="px-2 py-1">
      <Link href={`/items/${id}`}>
        <p>{name}</p>
      </Link>
      <p className="font-bold text-lg">{currency(price)}</p>
    </CardContent>
  </Card>
);

export default React.memo(Product);
