"use client"
import { imageLoader } from "@/lib/helper"
import Image from "next/legacy/image"
import { useRouter } from "next/navigation"

const SearchItem = ({ searchItem }) => {
  const router = useRouter()
  return (
    <div
      className="search-content-item"
      onClick={() => router.push(`/single/${searchItem.id}-${searchItem.type}`)}
    >
      <figure>
        <Image
          loader={imageLoader}
          src={
            searchItem.image_url.replace("https://static.namava.ir", "") || ""
          }
          alt={searchItem.name}
          layout="fill"
        />
      </figure>
      <span className="search-content-item-name">{searchItem.name}</span>
      <nav className="search-content-rate-imdb">
        <a>
          <span>7.2</span>
          <i className="fa-brands fa-mdb"></i>
        </a>
        <a>
          <span>90</span>
          <i className="fa-solid fa-heart fa-lg"></i>
        </a>
      </nav>
      <button className="search-content-play">
        <i className="fa-solid fa-play"></i>
      </button>
    </div>
  )
}
export default SearchItem
