import React from 'react';
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
import Item from '@components/Item';

const SLIDE_OPTIONS = 'w-full h-full bg-no-repeat bg-cover bg-center object-cover';

const HomePage = () => (
  <Page name="home">
    <Navbar>
      <NavLeft>
        <Link searchbarEnable=".searchbar-demo" iconIos="f7:search" iconAurora="f7:search" iconMd="material:search" />
      </NavLeft>
      <NavTitle>SUNFUME</NavTitle>
      <NavRight>
        <Link href="/line_items" iconF7="cart" iconBadge={3} badgeColor="red" />
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
      <SwiperSlide
        className={SLIDE_OPTIONS}
        style={{
          backgroundImage: `url(https://www.aesop.com/u1nb1km7t5q7/4uahoGkAUbKTdgi26UWS8U/d35893987804270676a1ab2a46ad2038/Our-Story-Carousel-1-Desktop-2880x1620.jpg)`,
        }}
      />
      <SwiperSlide
        className={SLIDE_OPTIONS}
        style={{
          backgroundImage: `url(https://www.aesop.com/u1nb1km7t5q7/6fsPa4NCMUwwMkM4zCgI6D/7a3798640d11e6ec5834b43ac2433959/Aesop_About_Page_Primary_Desktop_1440x1500px.jpg)`,
        }}
      />
    </Swiper>
    <Categories />
    <div className="grid grid-cols-2 gap-2 p-2">
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  </Page>
);

export default React.memo(HomePage);
