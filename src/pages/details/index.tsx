import React, { useState, useEffect } from 'react';
import { Card, Navbar, NavTitle, Page, Swiper, SwiperSlide } from 'framework7-react';
import { useRecoilState } from 'recoil';
import { currency } from '@js/utils';
import { getItemDetail } from '@api';
import { totalPriceState } from '@atoms';
import { ItemDetail } from '@constants';
import MoreDetail from './moreDetail';
import SelectOption from './selectOption';

const SLIDE_OPTIONS = 'w-full h-full bg-no-repeat bg-cover bg-center object-cover';

const ItemDetailPage = ({ id }) => {
  const [itemDetail, setItemDetail] = useState<ItemDetail>();
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

  useEffect(() => {
    const getData = async () => {
      const item = (await getItemDetail(id)).data;
      setItemDetail({ ...item });
      setTotalPrice(item.price);
    };
    getData();
  }, []);

  return (
    <Page name="item">
      <Navbar sliding={false} backLink>
        <NavTitle>제품상세</NavTitle>
      </Navbar>
      {itemDetail && (
        <>
          <Swiper pagination={{ clickable: true }} spaceBetween={10} className="swiper-container w-full h-1/2" observer>
            {itemDetail?.images?.map((image: string, index) => (
              <SwiperSlide
                key={Number(index)}
                className={SLIDE_OPTIONS}
                style={{
                  backgroundImage: `url(${image})`,
                }}
              />
            ))}
          </Swiper>
          <Card outline>
            <span slot="header">
              {itemDetail.name}
              <span className="text-sm text-gray-400 mx-2">{itemDetail.capacity}</span>
            </span>
            <span slot="content" className="text-2xl font-bold">
              {currency(itemDetail.price)}원
            </span>
          </Card>
          <MoreDetail desc={itemDetail.description} />
          <SelectOption itemDetail={itemDetail} id={id} />
        </>
      )}
    </Page>
  );
};
export default ItemDetailPage;
