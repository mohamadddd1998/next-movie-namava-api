"use client"
import React, { createContext, useState } from "react"

const SeasonContext = createContext(null)

export const SeasonProvider = ({ children }) => {
  const [seasonId, setSeasonId] = useState({
    id: null,
    req: false,
  })

  return (
    <SeasonContext.Provider value={{ setSeasonId, seasonId }}>
      {children}
    </SeasonContext.Provider>
  )
}
export default SeasonContext
