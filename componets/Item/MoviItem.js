"use client"
import { fetchData, imageLoader, typeOfMedia } from "@/lib/helper"
import Image from "next/legacy/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

const MoviItem = ({ movieItem }) => {
  const [info, setInfo] = useState(null)
  const router = useRouter()
  const fetchMovieItemInfo = (id) => {
    fetchData(
      `${process.env.NEXT_PUBLIC_FRONTEND_API_URL}/v1.0/medias/${id}/brief-preview`,
      () => {}
    ).then((result) => setInfo(result))
  }

  return (
    <>
      <div
        className="list-swiper-slide-item"
        onMouseOver={() => fetchMovieItemInfo(movieItem.id)}
        onClick={() => router.push(`/single/${movieItem.id}-${movieItem.type}`)}
      >
        <figure>
          <Image
            loader={imageLoader}
            src={movieItem.imageUrl || ""}
            alt={movieItem.caption}
            layout="fill"
            loading="lazy"
          />
        </figure>
        {info && (
          <div className="movie_item_info">
            <button className="preview_btn">
              <i className="fa-solid fa-play"></i>
            </button>
            <div className="movie_item_info_detail">
              <h4>{movieItem.caption}</h4>
              <nav className="quality_date">
                <span className="quality">HD</span>
                {info.year && <span className="date">{info.year}</span>}
              </nav>
              <nav className="type">
                <a style={{ backgroundColor: "#e50916", padding: "0px 3px" }}>
                  {typeOfMedia(movieItem.type)}
                </a>
              </nav>
              <nav className="rate_imdb">
                {info.imdb && (
                  <a>
                    <span>{info.imdb}</span>
                    <i
                      className="fa-brands fa-mdb"
                      style={{ fontSize: "20px", verticalAlign: "middle" }}
                    ></i>
                  </a>
                )}
                {info.hit != 0 && (
                  <a>
                    <span>{info.hit}</span>
                    <i className="fa-solid fa-heart fa-lg"></i>
                  </a>
                )}
              </nav>
            </div>
          </div>
        )}
        <span
          className="media_type"
          style={
            typeOfMedia(movieItem.type) == "سریال"
              ? { background: "#e88103" }
              : { background: "#1d9225" }
          }
        >
          {typeOfMedia(movieItem.type)}
        </span>
      </div>
    </>
  )
}
export default MoviItem
