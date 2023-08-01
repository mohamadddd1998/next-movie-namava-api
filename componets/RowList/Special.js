"use client"
import { useEffect, useState } from "react"
import SpecialItwm from "../Item/SpecialItem"
import { fetchData } from "@/lib/helper"

const Special = () => {
  const [specials, setSpecials] = useState([])
  useEffect(() => {
    fetchData(
      `${process.env.NEXT_PUBLIC_FRONTEND_API_URL}/v1.0/medias/banners/1188?pi=1&ps=20`,
      () => {}
    ).then((result) => {
      setSpecials(result.slice(0, 6))
    })
  }, [])
  return (
    <section>
      <div className="container special">
        {specials.length > 0 &&
          specials.map((special, index) => (
            <SpecialItwm key={index} special={special} />
          ))}
      </div>
    </section>
  )
}
export default Special
