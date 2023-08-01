'use client'
import SliderContext from "@/context/SliderContext";
import { imageLoader, typeOfMedia, typeSingleUrl } from "@/lib/helper";
import Image from "next/legacy/image";
import Link from "next/link";
import { useContext } from "react";

const SliderItems = ({ sliderItem }) => {
  const { setVideoUrl } = useContext(SliderContext);
  const darkBody = (url) => {
    document.getElementById("dark_body").classList.add("dark_body")
    setVideoUrl(url);
  };
  return (
    <>
      <div className="container swiper-slide-content">
        <div className="swiper-slide-content-right">
        <figure className="swiper-slide-logoImageUrl">
          <Image
            loader={imageLoader}
            src={sliderItem.logoImageUrl || ''}
            alt={sliderItem.slug}
            width={110}
            height={60}
            loading="lazy"
          />
        </figure>
        <Link href={(typeSingleUrl(sliderItem.type)=='movie' || typeSingleUrl(sliderItem.type)=='series') ? `/single/${sliderItem.id}-${sliderItem.type}` : ''}>
        <h3 className="swiper-slide-title">{sliderItem.caption}</h3>
        </Link>
        <p className="swiper-slide-description">{sliderItem.story}</p>
        <nav className="slide_detail" style={{ textAlign: "rigth" }}>
          {typeOfMedia(sliderItem.type) && (
            <a className="slide_detail_type">{typeOfMedia(sliderItem.type)}</a>
          )}
          {sliderItem.imdb && (
            <a className="slide_detail_imdb">
              {sliderItem.imdb}
              <i className="fa-brands fa-mdb"></i>
            </a>
          )}
          {sliderItem.hit != 0 && (
            <a className="slide_detail_love">
              <i className="fa-solid fa-heart fa-lg"></i>
              {sliderItem.hit}%
            </a>
          )}
          {sliderItem.year && (
            <a className="slide_detail_year">{sliderItem.year}</a>
          )}
          {sliderItem.mediaDuration && (
            <a className="slide_detail_time">
              {sliderItem.mediaDuration} دقیقه
            </a>
          )}
        </nav>
        <div className="swiper-slide-butons">
          {sliderItem.type == "Series" && <span>قسمت ها</span>}
          {sliderItem.type == "PurchasableMovie" && <span>خرید بلیط</span>}
          {sliderItem.type == "Movie" && <span>ورود و پخش</span>}
          {sliderItem.trailerVideoUrl && (
            <button onClick={() => darkBody(sliderItem.trailerVideoUrl)}>
              <i className="fa-solid fa-play"></i>
            </button>
          )}
        </div>
        </div>
        <div className="swiper-slide-content-left">
        {sliderItem.trailerVideoUrl && (
             <a onClick={() => darkBody(sliderItem.trailerVideoUrl)}>
             <i className="fa-solid fa-play"></i>
            </a>
          )}
        </div>
      </div>
      <figure className="swiper-slide-coverLandscape">
        <Image
          loader={imageLoader}
          src={
            window.innerWidth < 600
              ? sliderItem.coverPortrait
              : sliderItem.coverLandscape
          }
          layout="fill"
          alt={sliderItem.slug}
          loading="lazy"
        />
        <div className="cover"></div>
      </figure>
    </>
  );
};
export default SliderItems;
