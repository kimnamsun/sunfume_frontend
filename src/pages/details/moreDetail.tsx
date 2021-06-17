import React from 'react';
import { List, ListItem, Card, CardContent, Icon } from 'framework7-react';
import { useQuery } from 'react-query';
import moment from 'moment';
import { getItemReview } from '@api';
import { User, Review } from '@constants';
import Caution from '@components/Caution';
import StarRating from '@pages/review/StarRating';

const MoreDetail = ({ itemId }: { itemId: string }) => {
  const { data: itemReviewList } = useQuery<Review>(`itemReview${itemId}`, getItemReview(itemId));

  return (
    <>
      <Card outline>
        <CardContent className="text-sm">
          <p>
            <Icon f7="cube_box" size="15" className="font-bold" />
            &emsp;50,000원 미만 배송비 <span className="text-gray-500 font-bold">3,000원</span>
          </p>
          <p>
            <Icon f7="exclamationmark_square" size="15" className="font-bold" />
            &emsp;상품준비중 단계에서만 주문 취소 가능합니다.
          </p>
          <p>
            <Icon f7="cart" size="15" className="font-bold" />
            &emsp;오후 1시 이전 결제건에 한해 <span className="text-gray-500 font-bold">당일 발송</span>됩니다.
          </p>
          <p>
            <Icon f7="envelope" size="15" className="font-bold" />
            &emsp;sunfume@sunfume.kr
          </p>
        </CardContent>
      </Card>
      <List mediaList>
        {itemReviewList && itemReviewList.length && <ListItem title={`리뷰 (${itemReviewList.length})`} groupTitle />}
        {itemReviewList &&
          (itemReviewList.length ? (
            itemReviewList.map((review: User) => (
              <ListItem key={review.id} className="border-0">
                <span className="text-sm text-gray-500 font-bold">{review.name}</span>
                {review.reviews.map(({ id, rating, content, created_at }: Review) => (
                  <React.Fragment key={id}>
                    <p className="text-sm ">{moment(created_at).format('YYYY-MM-DD')}</p>
                    <span className="float-right">
                      <StarRating rating={rating} />
                    </span>
                    <p>{content}</p>
                  </React.Fragment>
                ))}
              </ListItem>
            ))
          ) : (
            <Caution>
              <span className="p-10 font-bold">작성된 리뷰가 없습니다.</span>
            </Caution>
          ))}
      </List>
    </>
  );
};

export default React.memo(MoreDetail);
