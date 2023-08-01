import { imageLoader } from "@/lib/helper"
import Image from "next/legacy/image"

const SpecialItwm = ({ special }) => {
  return (
    <div className="special-item">
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
        <h4 className="special-item-title">{special.caption}</h4>
        <nav>
          <a className="special-item-time">
            <span>120</span>
            <i className="fa-regular fa-clock"></i>
          </a>
          <a className="special-item-mdb">
            <span>7.2</span>
            <i className="fa-brands fa-mdb"></i>
          </a>
        </nav>
        <button className="special-item-play">
          پخش
          <i className="fa-solid fa-play"></i>
        </button>
      </div>

      <figure className="special-item-image">
        <Image
          loader={imageLoader}
          src={special.imageUrl || 0}
          alt={special.caption}
          layout="fill"
        />
      </figure>
    </div>
  )
}
export default SpecialItwm
