import List from "@/componets/RowList/List"
import Special from "@/componets/RowList/Special"
import Slider from "@/componets/slider/Slider"
import axios from "axios"
import React from "react"

const getTages = async () => {
  const response = await axios.get(`${process.env.FRONTEND_API_URL}/v4.0/menus`)
  if (response.data.succeeded) {
    let newResult = response.data.result.filter((res) => {
      return res.parentId == 1 && (res.slug == "movies" || res.slug == "series")
    })
    newResult = [...newResult[0].pageItems, ...newResult[1].pageItems]
    newResult = newResult.filter((newRes) => {
      return newRes.payloadType == "CategoryGroup"
    })
    return newResult.slice(0, 10)
  }
}
const Home = async () => {
  const tagItems = await getTages()
  return (
    <>
      <Slider />
      <Special />
      {tagItems &&
        tagItems.map((tagItem, index) => (
          <React.Fragment key={index}>
            <List tagItem={tagItem} />
          </React.Fragment>
        ))}
      <div style={{ marginBottom: "50px" }}></div>
    </>
  )
}
export default Home
