import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Lazy, Keyboard, Pagination } from 'swiper'
import Box from '@mui/material/Box'

import 'swiper/css'
import 'swiper/css/lazy'
import 'swiper/css/pagination'
import './styles.scss'

const Slider = () => {
  return (
    <Box className="slider" component="section">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="slider-container"
        keyboard={{
          enabled: true,
        }}
        lazy={true}
        loop={true}
        modules={[Autoplay, Lazy, Keyboard, Pagination]}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        spaceBetween={24}
      >
        <SwiperSlide>
          <picture>
            <source media="(min-width: 600px)" srcSet="/img/slider/slider1.webp" />
            <img alt="Slider 1" srcSet="/img/slider/slider1-640.webp" title="Slider 1" />

            <div className="content">
              <div className="title">Accessories</div>
            </div>
          </picture>
        </SwiperSlide>
        <SwiperSlide>
          <picture>
            <source media="(min-width: 600px)" srcSet="/img/slider/slider2.webp" />
            <img alt="Slider 2" srcSet="/img/slider/slider2-640.webp" title="Slider 2" />
            <div className="content">
              <div className="title">Standing desk</div>
            </div>
          </picture>
        </SwiperSlide>
        <SwiperSlide>
          <picture>
            <source media="(min-width: 600px)" srcSet="/img/slider/slider3.webp" />
            <img alt="Slider 3" srcSet="/img/slider/slider3-640.webp" title="Slider 3" />
            <div className="content">
              <div className="title">Ergonomic</div>
            </div>
          </picture>
        </SwiperSlide>
      </Swiper>
    </Box>
  )
}

export default Slider
