import React, { useEffect, useState, useCallback } from 'react';
import { Page, Swiper, SwiperSlide, NavLeft, Navbar, Link, NavRight, NavTitle } from 'framework7-react';
import { useRecoilState } from 'recoil';
import { logoutAPI, getItems, getLikeItem } from '@api';
import { Item } from '@constants';
import { likeState } from '@atoms';
import { SLIDE_PREFIX, configs } from '@config';
import Categories from '@components/Categories';
import Product from '@components/Product';
import NavCart from '@components/NavCart';
import useAuth from '@hooks/useAuth';

const SLIDE_DATAS = {
  option: 'w-full h-full bg-no-repeat bg-cover bg-center object-cover',
  images: [
    `${SLIDE_PREFIX.main}/4uahoGkAUbKTdgi26UWS8U/d35893987804270676a1ab2a46ad2038/Our-Story-Carousel-1-Desktop-2880x1620.jpg`,
    `${SLIDE_PREFIX.main}/2PpcVH3jmgnmlOWo1AZs0l/30e1f9848e4e7d9b694a313cd787f9d1/Our-Story-Carousel-2-Desktop-2880x1620.jpg`,
    `${SLIDE_PREFIX.main}/3PKKR9alriDf7lD9MegHnM/7d085941e3a907e401d3ffa15c6457f4/Our-Story-Carousel-3-Desktop-2880x1620.jpg`,
    `${SLIDE_PREFIX.main}/6fsPa4NCMUwwMkM4zCgI6D/7a3798640d11e6ec5834b43ac2433959/Aesop_About_Page_Primary_Desktop_1440x1500px.jpg`,
  ],
};

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [likeItem, setLikeItem] = useRecoilState(likeState);
  const { unAuthenticateUser } = useAuth();

  useEffect(() => {
    (async () => {
      const { data } = await getItems();
      setItems(data.items);
      const { data: likeData } = await getLikeItem();
      setLikeItem(likeData);
    })();
  }, []);

  const logoutHandler = useCallback(async () => {
    try {
      await logoutAPI();
    } catch (e) {
      // console.log(e);
    } finally {
      unAuthenticateUser();
    }
  }, [unAuthenticateUser]);

  const likeItemArray = [];
  likeItem.map((like) => likeItemArray.push(like.id));

  return (
    <Page name="home">
      <Navbar>
        <NavLeft>
          <Link onClick={logoutHandler} iconF7="square_arrow_right" />
        </NavLeft>
        <NavTitle>{configs.SITE_NAME}</NavTitle>
        <NavRight>
          <NavCart />
        </NavRight>
      </Navbar>
      <Swiper
        pagination={{ clickable: true }}
        observer
        autoplay
        spaceBetween={10}
        className="swiper-container w-full h-1/3"
      >
        {SLIDE_DATAS.images.map((image: string, index: number) => (
          <SwiperSlide
            key={Number(index)}
            className={SLIDE_DATAS.option}
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        ))}
      </Swiper>
      <Categories />
      <div className="grid grid-cols-2 gap-2 p-2">
        {items.map((item: Item) => (
          <Product
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.images[0]}
            isLike={likeItemArray.includes(item.id)}
          />
        ))}
      </div>
      )
    </Page>
  );
};

export default React.memo(HomePage);
