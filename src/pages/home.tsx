import React, { useEffect, useState } from 'react';
import { getItems } from '@api';
import {
  Page,
  Swiper,
  SwiperSlide,
  Link,
  Navbar,
  NavLeft,
  NavRight,
  NavTitle,
  Searchbar,
  theme,
} from 'framework7-react';
import Categories from '@components/Categories';
import Product from '@components/Product';
import { Item } from '@constants';

const SLIDE_DATAS = {
  option: 'w-full h-full bg-no-repeat bg-cover bg-center object-cover',
  images: [
    'https://www.aesop.com/u1nb1km7t5q7/4uahoGkAUbKTdgi26UWS8U/d35893987804270676a1ab2a46ad2038/Our-Story-Carousel-1-Desktop-2880x1620.jpg',
    'https://www.aesop.com/u1nb1km7t5q7/2PpcVH3jmgnmlOWo1AZs0l/30e1f9848e4e7d9b694a313cd787f9d1/Our-Story-Carousel-2-Desktop-2880x1620.jpg',
    'https://www.aesop.com/u1nb1km7t5q7/3PKKR9alriDf7lD9MegHnM/7d085941e3a907e401d3ffa15c6457f4/Our-Story-Carousel-3-Desktop-2880x1620.jpg',
    'https://www.aesop.com/u1nb1km7t5q7/6fsPa4NCMUwwMkM4zCgI6D/7a3798640d11e6ec5834b43ac2433959/Aesop_About_Page_Primary_Desktop_1440x1500px.jpg',
  ],
};

const HomePage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getItems();
      setItems(data.items);
    })();
  }, []);

  return (
    <Page name="home">
      <Navbar>
        <NavLeft>
          <Link searchbarEnable=".searchbar-demo" iconIos="f7:search" iconAurora="f7:search" iconMd="material:search" />
        </NavLeft>
        <NavTitle>SUNFUME</NavTitle>
        <NavRight>
          <Link href="/cart" iconF7="cart" iconBadge={3} badgeColor="red" />
        </NavRight>
        <Searchbar
          className="searchbar-demo"
          expandable
          searchContainer=".search-list"
          searchIn=".item-title"
          disableButton={!theme.aurora}
        />
      </Navbar>
      <Swiper
        pagination={{ clickable: true }}
        observer
        autoplay
        spaceBetween={10}
        className="swiper-container w-full h-1/3"
      >
        {SLIDE_DATAS.images.map((image, index) => (
          <SwiperSlide
            key={index}
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
          <Product key={item.id} id={item.id} name={item.name} price={item.price} image={item.images[0]} />
        ))}
      </div>
    </Page>
  );
};

export default React.memo(HomePage);
