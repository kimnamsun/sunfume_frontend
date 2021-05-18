import React, { useState, useEffect } from 'react';
import {
  Card,
  ActionsGroup,
  ActionsLabel,
  Stepper,
  Actions,
  Icon,
  Navbar,
  NavTitle,
  Page,
  Button,
  Swiper,
  SwiperSlide,
  Toolbar,
  List,
} from 'framework7-react';
import { useRecoilState } from 'recoil';
import { currency } from '@js/utils';
import { getItemDetail } from '@api';
import { totalPriceState, selectOptionState, itemAmountState, likeState } from '@atoms';
import { ItemDetail } from '@constants';
import LikeBtn from '@components/LikeBtn';
import MoreDetail from './moreDetail';

const SLIDE_OPTIONS = 'w-full h-full bg-no-repeat bg-cover bg-center object-cover';

const ItemDetailPage = ({ id }) => {
  const [itemDetail, setItemDetail] = useState<ItemDetail>();
  const [itemAmount, setItemAmount] = useRecoilState(itemAmountState);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  const [selectOption, setSelectOption] = useRecoilState(selectOptionState);
  const [likeItem, setLikeItem] = useRecoilState(likeState);

  useEffect(() => {
    const getData = async () => {
      const item = (await getItemDetail(id)).data;
      setItemDetail({ ...item });
      setTotalPrice(item.price);
    };
    getData();
  }, []);

  const selectedOption = (e) => {
    setSelectOption(Number(e.target.value));
  };

  useEffect(() => {
    setTotalPrice((selectOption + (itemDetail && itemDetail.price)) * itemAmount);
  }, [selectOption, itemAmount]);

  const goToCart = () => {
    console.log(totalPrice);
  };

  const likeItemArray = [];
  likeItem.map((like) => likeItemArray.push(like.id));

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
          <Toolbar tabbar labels bottom>
            <Button raised round className="w-1/2 mx-1">
              <LikeBtn type="detail" id={id} isLike={likeItemArray.includes(itemDetail.id)} />
            </Button>
            <Button raised round className="w-1/2 mx-1" actionsOpen="#select-option">
              <Icon f7="cart" />
            </Button>
          </Toolbar>
          <Actions id="select-option" className="bg-white">
            <ActionsGroup>
              <ActionsLabel>
                <List className="w-full m-0">
                  <select
                    className="border-solid border border-gray-300"
                    onChange={selectedOption}
                    defaultValue={'default'}
                  >
                    <option value="default" disabled hidden>
                      옵션 선택
                    </option>
                    {itemDetail.option.map(({ name, add_price }, index) => (
                      <option key={String(index)} value={add_price}>
                        {name} (+ {add_price}원)
                      </option>
                    ))}
                  </select>
                </List>
              </ActionsLabel>
              <ActionsLabel className="flex justify-between">
                <Stepper
                  className="black"
                  color="teal"
                  raised
                  value={itemAmount}
                  min={1}
                  max={itemDetail.stock}
                  onStepperChange={setItemAmount}
                />
                <div className="text-black text-lg">
                  총<span className="inline-block font-bold ml-3">{currency(totalPrice)}</span>원
                </div>
              </ActionsLabel>
              <ActionsLabel className="text-white">
                <Button onClick={goToCart} className="w-full" large fill actionsClose>
                  장바구니 담기
                </Button>
              </ActionsLabel>
            </ActionsGroup>
          </Actions>
        </>
      )}
    </Page>
  );
};

export default ItemDetailPage;
