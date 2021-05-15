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
  ListItem,
} from 'framework7-react';
import { getItemDetail } from '@api';
import { Item } from '@constants';
import MoreDetail from './moreDetail';

const SLIDE_OPTIONS = 'w-full h-full bg-no-repeat bg-cover bg-center object-cover';
// type ItemDetail = {
//   name?: string;
//   price: number;
//   description: string;
//   capacity: string;
//   options?: string[];
//   images: string[];
// };

const ItemDetailPage = ({ id }) => {
  const [itemDetail, setItemDetail] = useState({});
  const [itemAmount, setItemAmount] = useState(1);
  // const [itemDetail, setItemDetail] = useState<ItemDetail>({});

  useEffect(() => {
    const getData = async () => {
      const item = (await getItemDetail(id)).data;
      setItemDetail({ ...item });
      // setTotalPrice(item.price);
    };
    getData();
  }, []);

  const selectedOption = (e) => {
    console.log(e.target.value);
  };

  return (
    <Page name="item" noToolbar>
      <Navbar sliding={false} backLink>
        <NavTitle>제품상세</NavTitle>
      </Navbar>
      <Swiper pagination={{ clickable: true }} spaceBetween={10} className="swiper-container w-full h-1/2" observer>
        {itemDetail &&
          itemDetail?.images?.map((image, index) => (
            <SwiperSlide
              key={index}
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
          {Number(itemDetail.price).toLocaleString()}원
        </span>
      </Card>
      <MoreDetail desc={itemDetail.description} />
      <Toolbar tabbar labels bottom>
        <Button raised round className="w-1/2 mx-1">
          <Icon f7="heart" />
        </Button>
        <Button raised round className="w-1/2 mx-1" actionsOpen="#select-option">
          <Icon f7="cart" />
        </Button>
      </Toolbar>
      <Actions id="select-option" className="bg-white">
        <ActionsGroup>
          <ActionsLabel>
            <List className="w-full m-0">
              <select name="" id="">
                {itemDetail &&
                  itemDetail?.options?.map(({ add_price, name }, index) => (
                    // <ListItem
                    //   key={index}
                    //   radio
                    //   radioIcon="end"
                    //   name={option.name}
                    //   title={option.name}
                    //   after={option.add_price}
                    //   value={option.add_price}
                    //   onChange={selectedOption}
                    // />
                    <option key={index} value={add_price}>
                      <span>{name}</span>
                      <span>{add_price}</span>
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
              max={100}
              onStepperChange={setItemAmount}
            />
            <div className="text-black text-lg">
              총<span className="inline-block font-bold ml-3">{(itemDetail.price * itemAmount).toLocaleString()}</span>
              원
            </div>
          </ActionsLabel>
          <ActionsLabel className="text-white">
            <Button className="w-full" large fill actionsClose>
              장바구니 담기
            </Button>
          </ActionsLabel>
        </ActionsGroup>
      </Actions>
    </Page>
  );
};

export default ItemDetailPage;
