"use client"
import React, { createContext, useState } from "react"

const SearchContext = createContext(null)

export const SearchProvider = ({ children }) => {
  const [searchItemsInput, setSearchItemsInput] = useState([
    {
      id: 1,
      title: "زیرنویس فارسی",
      isActive: false,
      queryKey: "subtitle",
      queryValue: "Persian",
    },
    {
      id: 2,
      title: "ایرانی",
      isActive: false,
      queryKey: "CountryProducer",
      queryValue: 3,
    },
    {
      id: 3,
      title: "دوبله فارسی",
      isActive: false,
      queryKey: "dubs",
      queryValue: 2,
    },
  ])
  const [activeItemsInput, setActiveItemsInput] = useState([])
  const [searchItems, setSearchItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [querySearch, setQuerySearch] = useState(null)
  return (
    <SearchContext.Provider
      value={{
        searchItemsInput,
        setSearchItemsInput,
        activeItemsInput,
        setActiveItemsInput,
        setSearchItems,
        searchItems,
        setLoading,
        loading,
        page,
        setPage,
        querySearch,
        setQuerySearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
export default SearchContext
