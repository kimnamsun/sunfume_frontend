import React, { useState, useEffect } from 'react';
import { Card, Navbar, Page, Swiper, SwiperSlide, Chip } from 'framework7-react';
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
    <Page noToolbar name="item">
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
          <Card noShadow>
            <span className="text-lg">{itemDetail.name}</span>
            <span className="text-sm text-gray-400 mx-2">{itemDetail.capacity}</span>
            <p className="text-2xl font-bold text-green-500">{currency(itemDetail.price)}원</p>
            <p className="mt-2">{itemDetail.description}</p>
          </Card>
          <MoreDetail itemId={id} />
          <SelectOption itemDetail={itemDetail} option={itemOptions} id={id} />
        </>
      )}
    </Page>
  );
};
export default React.memo(ItemDetailPage);
