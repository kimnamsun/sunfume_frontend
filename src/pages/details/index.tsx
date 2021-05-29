import React, { useState, useEffect } from 'react';
import { Card, Navbar, Page, Swiper, SwiperSlide } from 'framework7-react';
import { useRecoilState } from 'recoil';
import { currency } from '@js/utils';
import { getItemDetail, getItemOption } from '@api';
import { totalPriceState } from '@atoms';
import { ItemDetail, PageRouteProps, Option } from '@constants';
import MoreDetail from './MoreDetail';
import SelectOption from './SelectOption';

const SLIDE_OPTIONS = 'w-full h-full bg-no-repeat bg-cover bg-center object-cover';

const ItemDetailPage = ({ f7route }: PageRouteProps) => {
  const { id } = f7route.params;
  const [itemDetail, setItemDetail] = useState<ItemDetail>();
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  const [itemOptions, setItemOptions] = useState<Option>();

  useEffect(() => {
    const getData = async () => {
      const item = (await getItemDetail(id)).data;
      setItemDetail({ ...item });
      setTotalPrice(item.price);
      const { data: optionData } = await getItemOption(id);
      setItemOptions(optionData);
    };
    getData();
  }, []);

  return (
    <Page name="item">
      <Navbar title="제품상세" backLink sliding={false} />
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
          <MoreDetail itemId={id} desc={itemDetail.description} />
          <SelectOption itemDetail={itemDetail} option={itemOptions} id={id} />
        </>
      )}
    </Page>
  );
};
export default React.memo(ItemDetailPage);
