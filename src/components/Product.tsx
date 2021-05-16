import React from 'react';
import { currency } from '@js/utils';
import { Card, CardHeader, CardContent, Link, Icon } from 'framework7-react';

const Product = ({ id, name, price, image }) => (
  // const Item = ({ id, images, description, name, amount, is_like, handleLike }) => (
  <Card noShadow className="w-full m-0">
    <CardHeader className="p-0 relative">
      <Link href={`/items/${id}`}>
        <img alt="itemImage" className="w-full rounded-md object-cover" src={image} />
      </Link>
      <button className="absolute w-6 h-6 right-2 bottom-2.5 z-20 focus:outline-none">
        <Icon size="20" color="red" icon="las la-heart" />
      </button>
    </CardHeader>
    <CardContent className="px-2 py-1">
      <Link href={`/items/${id}`}>
        <p>{name}</p>
      </Link>
      <p className="font-bold text-lg">{currency(price)}</p>
    </CardContent>
  </Card>
);

export default Product;
