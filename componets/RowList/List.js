"use client"
import { useEffect, useState } from "react"
import MoviItem from "../Item/MoviItem"
import { fetchData } from "@/lib/helper"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"

const List = ({ tagItem }) => {
  const [movieItems, setMovieItems] = useState([])
  useEffect(() => {
    fetchData(
      `${process.env.NEXT_PUBLIC_FRONTEND_API_URL}/v1.0/category-groups/${tagItem.payloadKey}/tags/${tagItem.caption}/latest-medias?pi=1&ps=15`,
      () => {}
    ).then((result) => {
      setMovieItems(result)
    })
  }, [])

  return (
    <>
      {movieItems.length > 0 && (
        <>
          <section>
            <div className="movie_title">
              <a className="movie_title_header">{tagItem.caption}</a>
              <a className="movie_title_seeAll">
                <span>مشاهده ی همه</span>
                <i className="fa-solid fa-chevron-left"></i>
              </a>
            </div>
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={5}
              navigation
              autoplay={{ delay: 2500 }}
              slidesPerView={2}
              breakpoints={{
                450: {
                  slidesPerView: 3,
                },

                600: {
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
              className="list-swiper"
            >
              {movieItems.map((movieItem, index) => (
                <SwiperSlide className="list-swiper-slide" key={index}> 
                  <MoviItem  movieItem={movieItem} />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </>
      )}
    </>
  )
}
export default List
