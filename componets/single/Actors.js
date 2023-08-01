"use client"
import {imageLoader } from "@/lib/helper"
import Image from "next/legacy/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"

const Actors = ({ actors }) => {
  return (
    <section>
      <div className="actors-title">
        <h3>بازیگران</h3>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={5}
        navigation
        autoplay={{ delay: 2500 }}
        slidesPerView={1}
        className="actors-items"
        breakpoints={{
          400: {
            slidesPerView: 2,
          },
          500: {
            slidesPerView: 3,
          },

          700: {
            slidesPerView: 4,
          },
          800: {
            slidesPerView: 5,
          },
          900: {
            slidesPerView: 6,
          },
          1024: {
            slidesPerView: 7,
          },
        }}
      >
        {actors.map((actor, index) => (
          <SwiperSlide key={index}>
            <div className="actor-item">
              <figure>
                {actor.castImageUrl && (
                  <Image
                    loader={imageLoader}
                    src={actor.castImageUrl || ""}
                    alt={actor.castName}
                    layout="fill"
                  />
                )}
              </figure>
              <div className="overlay">
                <div className="text">{actor.castName}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
export default Actors
