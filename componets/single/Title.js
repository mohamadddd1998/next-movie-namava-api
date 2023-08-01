"use client"
import SeasonContext from "@/context/SeasonContext"
import { useContext, useState } from "react"

const Title = ({ seasons }) => {
  const [toggle, setToggle] = useState(false)
  const [seasonNumber, setSeasonNumber] = useState(seasons[0].seasonOrderId)
  const { setSeasonId } = useContext(SeasonContext)
  const handleSeason = (number, id) => {
    setToggle(!toggle)
    setSeasonNumber(number)
    setSeasonId((oldId) => {
      if (oldId.id == id) {
        return {
          ...oldId,
          req: false,
        }
      }
      return { id: id, req: true }
    })
  }
  return (
    <section>
      <div className="season-title" id='season-title'>
        <div className="season-select">
          <a onClick={() => setToggle(!toggle)}>
            <span>فصل {seasonNumber}</span>
            <i className="fa-regular fa-circle-down"></i>
          </a>
          {toggle && (
            <ul>
              {seasons.reverse().map((season, index) => (
                <li
                  key={index}
                  onClick={() =>
                    handleSeason(season.seasonOrderId, season.seasonId)
                  }
                >
                  {season.seasonName.split("-")[1]}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="season-detail">
          <a>
            <i className="fa-brands fa-youtube"></i>
          </a>
          <a>
            <span>تعداد کل فصل ها</span>
            <span> : </span>
            <span>{seasons.length}</span>
          </a>
          <a>
            <span>وضعیت پخش</span>
            <span> : </span>
            <span>چهارشنبه ها ساعت 8 صبح</span>
          </a>
        </div>
      </div>
    </section>
  )
}
export default Title
