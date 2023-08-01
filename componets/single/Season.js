"use client"
import { useContext, useEffect, useState } from "react"
import SeasonItem from "../Item/SeasonItem"
import { fetchData } from "@/lib/helper"
import { Ping } from "@uiball/loaders"
import SeasonContext from "@/context/SeasonContext"

const Season = ({ seasons }) => {
  const [seasonItems, setSeasonItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { seasonId, setSeasonId } = useContext(SeasonContext)
  useEffect(() => {
    if (seasonId.id != null && seasonId.req == true) {
      fetchData(
        `${process.env.NEXT_PUBLIC_FRONTEND_API_URL}/v2.0/medias/seasons/${seasonId.id}/episodes`,
        setLoading
      ).then((result) => {
        setSeasonItems(result)
      })
    }
  }, [seasonId])
  useEffect(() => {
    fetchData(
      `${process.env.NEXT_PUBLIC_FRONTEND_API_URL}/v2.0/medias/seasons/${seasons[0].seasonId}/episodes`,
      setLoading
    ).then((result) => {
      setSeasonId({ ...seasonId, id: seasons[0].seasonId })
      setSeasonItems(result)
    })
  }, [seasons])
  return (
    <section style={{ marginTop: "25px" }}>
      {loading ? (
        <div className="season__loading">
          <Ping size={90} speed={2} color="#fff" />
        </div>
      ) : (
        <div className="container special">
          {seasonItems.length > 0 &&
            seasonItems.map((seasonItem, index) => (
              <SeasonItem key={index} season={seasonItem} />
            ))}
        </div>
      )}
    </section>
  )
}
export default Season
