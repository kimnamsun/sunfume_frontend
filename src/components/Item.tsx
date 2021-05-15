import React from 'react';
import { Card, CardHeader, CardContent, Link, Icon } from 'framework7-react';

const Item = () => (
  // const Item = ({ id, images, description, name, amount, is_like, handleLike }) => (
  <Card noShadow className="w-full m-0">
    <CardHeader className="p-0 relative">
      <Link>
        <img
          alt="item"
          className="w-full rounded-md object-cover"
          src="https://nonfiction.kr/web/product/small/20191125/664ede35903397710f85580cb96a7f83.jpg"
        />
      </Link>
      <button className="absolute w-6 h-6 right-2 bottom-2.5 z-20 focus:outline-none">
        <Icon size="20" color="red" icon="las la-heart" />
      </button>
    </CardHeader>
    <CardContent className="px-2 py-1">
      <Link>
        <p>꽃향기 향수</p>
      </Link>
      <p className="font-bold text-lg">85,000</p>
    </CardContent>
  </Card>
);

export default Item;
