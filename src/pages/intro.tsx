import React, { useEffect, useState } from 'react';
import { Button, Navbar, Page, Swiper, SwiperSlide, NavTitle } from 'framework7-react';
import { SLIDE_PREFIX, configs } from '@config';

const IntroPage = () => {
  const SLIDES: string[] = [
    `${SLIDE_PREFIX.intro}/b4a4d56ae278add3c010d088f000a338.jpg`,
    `${SLIDE_PREFIX.intro}/ca37bd8a827c2b827d5037683fba5b59.jpg`,
    `${SLIDE_PREFIX.intro}/ccd85b8c0aeeffa49dc355af1b10bd74.jpg`,
  ];

  return (
    <Page>
      <Navbar>
        <NavTitle>{configs.SITE_NAME}</NavTitle>
      </Navbar>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides
        pagination={{ clickable: true }}
        observer
        className="align-content-center"
      >
        {SLIDES.map((slide: string, index: number) => (
          <SwiperSlide key={Number(index)}>
            <div className="flex justify-center p-0">
              <img src={slide} alt="slideImage" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="block block-strong m-10 pt-10 pb-10">
        <Button outline className="button button-large mb-5" href="/users/sign_in">
          로그인
        </Button>
        <Button className="button button-large" href="/users/sign_up" fill>
          회원가입
        </Button>
      </div>
    </Page>
  );
};
export default React.memo(IntroPage);
