import React, { useState, useEffect } from 'react';
import { Navbar, Page } from 'framework7-react';
import { Review } from '@constants';
import { getReview } from '@api';
import LineProduct from '@components/LineProduct';

const ReviewPage = () => {
  const [reviewList, setReviewList] = useState<Review>();

  useEffect(() => {
    (async () => {
      const { data: reviewData } = await getReview();
      setReviewList(reviewData);
    })();
  }, []);

  return (
    <Page>
      <Navbar title="리뷰 목록" backLink sliding={false} />
      {reviewList && reviewList.map((item: Review) => <LineProduct key={item.id} type="review" item={item} />)}
    </Page>
  );
};

export default ReviewPage;
