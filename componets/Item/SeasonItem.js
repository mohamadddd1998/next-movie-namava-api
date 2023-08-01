import { imageLoader } from "@/lib/helper"
import Image from "next/legacy/image"

const SeasonItem = ({ season }) => {
  return (
    <>
      <div
        className="special-item"
        style={{
          width: "280px",
          height: "180px",
          borderLeft: "3px solid #B9345A",
        }}
      >
        <div className="special-item-right">
          <a>
            <i className="fa-solid fa-share-nodes"></i>
          </a>
          <a>
            <i className="fa fa-heart"></i>
          </a>
          <a>
            <i className="fa-solid fa-plus"></i>
          </a>
        </div>
        <div className="special-item-left">
          <nav>
            <a className="special-item-time">
              <span>{season.mediaDuration}</span>
              <i className="fa-regular fa-clock"></i>
            </a>
            <a className="special-item-mdb">
              <span>{season.hit}</span>
              <i className="fa-solid fa-heart fa-lg"></i>
            </a>
          </nav>
          <button
            className="special-item-play"
            style={{ backgroundColor: "#B9345A" }}
          >
            پخش
            <i className="fa-solid fa-play"></i>
          </button>
        </div>
        <figure className="special-item-image">
          <Image
            loader={imageLoader}
            src={season.imageUrl || ""}
            alt={season.caption}
            loading="lazy"
            layout="fill"
          />
        </figure>
        <div className="special-item-caption">
          <span>{season.caption}</span>
        </div>
      </div>
    </>
  )
}
export default SeasonItem
