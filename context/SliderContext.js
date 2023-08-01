"use client"
import React, { createContext, useState } from "react"

const SliderContext = createContext(null)

export const SliderProvider = ({ children }) => {
  const [sliderItems, setSlierItems] = useState([])
  const [videoUrl, setVideoUrl] = useState(null)
  return (
    <SliderContext.Provider
      value={{ setSlierItems, sliderItems, setVideoUrl, videoUrl }}
    >
      {children}
    </SliderContext.Provider>
  )
}
export default SliderContext
