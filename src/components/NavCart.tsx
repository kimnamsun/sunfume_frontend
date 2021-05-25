import React, { useEffect, useState } from 'react';
import { Link } from 'framework7-react';
import { getLineItem } from '@api';
import { useRecoilState } from 'recoil';
import { lineItemCountState } from '@atoms';

const NavCart = () => {
  const [lineItemCount, setLineItemCount] = useRecoilState(lineItemCountState);

  useEffect(() => {
    (async () => {
      const { data } = await getLineItem();
      setLineItemCount(data.total_count === undefined ? 0 : data.total_count);
    })();
  }, []);
  return <Link href="/cart" iconF7="cart" iconBadge={lineItemCount || null} badgeColor="red" />;
};

export default React.memo(NavCart);
