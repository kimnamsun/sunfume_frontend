import React from 'react';
import { Button, Navbar, Page, Swiper, SwiperSlide } from 'framework7-react';
import i18next from 'i18next';
import { SLIDE_PREFIX, configs } from '@config';

const IntroPage = () => {
  const SLIDES: string[] = [
    `${SLIDE_PREFIX.intro}/b4a4d56ae278add3c010d088f000a338.jpg`,
    `${SLIDE_PREFIX.intro}/ca37bd8a827c2b827d5037683fba5b59.jpg`,
    `${SLIDE_PREFIX.intro}/ccd85b8c0aeeffa49dc355af1b10bd74.jpg`,
  ];

  return (
    <Page>
      <Navbar title={configs.SITE_NAME} sliding={false} />
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
          {i18next.t('login.title')}
        </Button>
        <Button className="button button-large" href="/users/sign_up" fill>
          {i18next.t('signup.title')}
        </Button>
      </div>
    </Page>
  );
};
export default React.memo(IntroPage);
