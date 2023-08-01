"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import SliderItems from "../Item/SliderItems"
import { useContext, useEffect, useState } from "react"
import { Ping } from "@uiball/loaders"
import { fetchData } from "@/lib/helper"
import SliderContext from "@/context/SliderContext"

const Slider = () => {
  const [loading, setLoading] = useState(true)
  const { setSlierItems, sliderItems } = useContext(SliderContext)
  useEffect(() => {
    fetchData(
      `${process.env.NEXT_PUBLIC_FRONTEND_API_URL}/v2.0/medias/sliders/1316`,
      setLoading
    ).then((result) => setSlierItems(result))
  }, [])

  return (
    <>
      {loading ? (
        <div className="slider__loading">
          <Ping size={90} speed={2} color="#fff" />
        </div>
      ) : (
        <>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            navigation
            autoplay={{ delay: 2500 }}
            className="header-swiper"
          >
            {sliderItems.length > 0 &&
              sliderItems.map((sliderItem, index) => (
                <SwiperSlide key={index} className="header-swiper-slide">
                  <SliderItems sliderItem={sliderItem} />
                </SwiperSlide>
              ))}
          </Swiper>
        </>
      )}
    </>
  )
}
export default Slider
