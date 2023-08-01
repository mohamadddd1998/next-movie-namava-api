"use client"
import { useEffect, useState } from "react"
import { fetchData, imageLoader } from "@/lib/helper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import Image from "next/legacy/image"
import { Ping } from "@uiball/loaders"
import { useRouter } from "next/navigation"

const Related = ({ item }) => {
  const [relatedItems, setRelatedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    fetchData(
      `${process.env.NEXT_PUBLIC_FRONTEND_API_URL}/v1.0/medias/${item.id}/recommend-items-anonymous-user?pi=1&ps=20`,
      setLoading
    ).then((result) => {
      setRelatedItems(result.items.slice(0, 9))
    })
  }, [])
  return (
    <>
      <div className="related">
        {loading ? (
          <div className="season__loading">
            <Ping size={90} speed={2} color="#fff" />
          </div>
        ) : (
          <>
            {relatedItems.length > 0 &&
              relatedItems.map((relatedItem, index) => (
                <div
                  className="related-item"
                  key={index}
                  onClick={() =>
                    router.push(`/single/${relatedItem.id}-${relatedItem.type}`)
                  }
                >
                  <figure>
                    <Image
                      loader={imageLoader}
                      src={relatedItem.imageUrl || ""}
                      alt={relatedItem.caption}
                      layout="fill"
                    />
                  </figure>
                  <span className="related-item-name">
                    {relatedItem.caption}
                  </span>
                  <nav className="related-rate-imdb">
                    <a>
                      <span>7.2</span>
                      <i className="fa-brands fa-mdb"></i>
                    </a>
                    <a>
                      <span>90</span>
                      <i className="fa-solid fa-heart fa-lg"></i>
                    </a>
                  </nav>
                  <button className="related-play">
                    <i className="fa-solid fa-play"></i>
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
    </>
  )
}
export default Related
