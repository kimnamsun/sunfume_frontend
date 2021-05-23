import React, { useState, useEffect } from 'react';
import { Segmented, Tabs, Tab, Button, List, ListItem } from 'framework7-react';
import { getItemReview } from '@api';
import StarRating from '../../pages/review/StarRating';

const MoreDetail = ({ itemId, desc }) => {
  const [itemReviewList, setItemReviewList] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: reviewList } = await getItemReview(itemId);
      setItemReviewList(reviewList);
    })();
  }, []);

  console.log(itemReviewList);

  return (
    <>
      <Segmented raised className="mx-4">
        <Button tabLink="#desc" tabLinkActive>
          상세정보
        </Button>
        <Button tabLink="#review">리뷰</Button>
      </Segmented>
      <Tabs>
        <Tab id="desc" tabActive className="page-content mx-5 text-center">
          <span>{desc}</span>
        </Tab>
        <Tab id="review" className="page-content mx-5 pt-0">
          <List mediaList>
            {itemReviewList &&
              itemReviewList.map((review) => (
                <ListItem key={review.id}>
                  <span className="text-sm text-gray-500">{review.name}</span>
                  {review.reviews.map(({ id, rating, content }) => (
                    <React.Fragment key={id}>
                      <span className="float-right">
                        <StarRating rating={rating} />
                      </span>
                      <p>{content}</p>
                    </React.Fragment>
                  ))}
                </ListItem>
              ))}
          </List>
        </Tab>
      </Tabs>
    </>
  );
};

export default MoreDetail;
