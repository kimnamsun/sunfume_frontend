import React, { useEffect } from 'react';
import { Link } from 'framework7-react';
import { useRecoilState } from 'recoil';
import { getLineItem } from '@api';
import { lineItemCountState } from '@atoms';
import useAuth from '@hooks/useAuth';

const NavCart = () => {
  const [lineItemCount, setLineItemCount] = useRecoilState(lineItemCountState);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        const { data } = await getLineItem();
        setLineItemCount(data.total_count || 0);
      })();
    }
  }, []);
  return <Link href="/cart" iconF7="cart" iconBadge={lineItemCount || null} badgeColor="red" />;
};

export default React.memo(NavCart);
