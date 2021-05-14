import Categories from '@components/Categories';
import SearchBar from '@components/SearchBar';
import { Link, Navbar, NavLeft, NavRight, NavTitle, Page, Swiper, SwiperSlide } from 'framework7-react';
import React from 'react';

const HomePage = () => (
  <Page name="home">
    <Navbar>
      {/* <NavLeft>
        <Link icon="las la-bars" panelOpen="left" />
      </NavLeft> */}
      <NavTitle>SUNFUME</NavTitle>
      <NavRight>
        <Link href="/line_items" iconF7="cart" iconBadge={3} badgeColor="red" />
      </NavRight>
    </Navbar>
    <div className="p-4 border-2">
      <Swiper spaceBetween={30} slidesPerView={1} pagination={{ clickable: true }} observer>
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </div>
    <Categories />
    <SearchBar />
  </Page>
);

export default React.memo(HomePage);
