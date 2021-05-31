import React from 'react';
import { Navbar, Page } from 'framework7-react';
import { useQuery } from 'react-query';
import { Review } from '@constants';
import { getReview } from '@api';
import LineProduct from '@components/LineProduct';

const ReviewPage = () => {
  const { data: reviewList } = useQuery<Review>('reviewList', getReview());

  return (
    <Page>
      <Navbar title="리뷰 목록" backLink sliding={false} />
      {reviewList && reviewList.map((item: Review) => <LineProduct key={item.id} type="review" item={item} />)}
    </Page>
  );
};

export default React.memo(ReviewPage);
