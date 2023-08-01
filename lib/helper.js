import axios from "axios"
import momentj from "moment-jalaali"
import fa from "moment/locale/fa"
import "moment-timezone"

const imageLoader = ({ src, width, quality }) => {
  return `https://www.namava.ir/${src}?w=${width}&q=${quality || 75}`
}
const fetchData = async (url, setLoading) => {
  try {
    setLoading(true)
    const response = await axios.get(url)
    if (response.data.succeeded) {
      return response.data.result
    }
    return null
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}
const typeOfMedia = (type) => {
  switch (type) {
    case "PurchasableMovie":
      return "سینمایی"
      break
    case "Series":
      return "سریال"
      break
    case "Live":
      return "زنده"
      break
    case "Movie":
      return "سینمایی"
      break

    default:
      return null
      break
  }
}
const getActors = (item) => {
  let newItem = item.filter((cast) => cast.castRole == "Actor")
  return newItem.slice(0, 5)
}
const getDirectors = (item) => {
  let newItem = item.filter((cast) => cast.castRole == "Director")
  return newItem
}
const typeSingleUrl = (type) => {
  switch (type) {
    case "PurchasableMovie":
    case "Movie":
      return "movie"
      break
    case "Series":
      return "series"
      break
    default:
      return null
      break
  }
}
const getDate = (time) => {
  momentj.locale("fa", fa)
  momentj.loadPersian({
    usePersianDigits: true,
  })
  let publishDate = new momentj(time.substr(0, 15))
  return publishDate
    .tz("Asia/Tehran")
    .locale("fa")
    .format("dddd jD jMMMM [ساعت] H")
}
const changeInputStyleStep1 = (id, activeItems, setActiveItems) => {
  let isActiveItem = activeItems.findIndex((activeItem) => {
    return activeItem == id
  })

  if (isActiveItem == -1) {
    setActiveItems([...activeItems, id])
  } else {
    let newActiveItems = activeItems.filter((activeItem) => {
      return activeItem != id
    })
    setActiveItems(newActiveItems)
  }
}
const changeInputStyleStep2 = (searchItems, activeItems, setSearchItems) => {
  let newSearchItems = searchItems.map((searchItem) => {
    if (activeItems.length > 0) {
      for (let i = 0; i < activeItems.length; i++) {
        if (activeItems[i] == searchItem.id) {
          return { ...searchItem, isActive: true }
        }
      }
      return { ...searchItem, isActive: false }
    }
    return { ...searchItem, isActive: false }
  })
  setSearchItems(newSearchItems)
}
export {
  imageLoader,
  fetchData,
  typeOfMedia,
  getActors,
  getDirectors,
  typeSingleUrl,
  getDate,
  changeInputStyleStep1,
  changeInputStyleStep2,
}
