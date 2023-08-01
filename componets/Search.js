"use client"

import SearchContext from "@/context/SearchContext"
import {
  changeInputStyleStep1,
  changeInputStyleStep2,
  fetchData,
} from "@/lib/helper"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import SearchItem from "./Item/SearchItem"
import { Ping } from "@uiball/loaders"

const Search = () => {
  const router = useRouter()
  const [show, setShow] = useState(true)
  const {
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
  } = useContext(SearchContext)

  useEffect(() => {
    changeInputStyleStep2(
      searchItemsInput,
      activeItemsInput,
      setSearchItemsInput
    )
  }, [activeItemsInput])
  useEffect(() => {
    let url = new URL(window.location.href)
    let search_param = url.searchParams
    let newsearchItemsInput = [...searchItemsInput]
    let newactiveItemsInput = []
    for (let key of search_param.keys()) {
      newsearchItemsInput = newsearchItemsInput.map((item) => {
        if (item["queryKey"] == key) {
          newactiveItemsInput.push(item["id"])
          return { ...item, isActive: true }
        }
        return item
      })
    }
    setSearchItemsInput(newsearchItemsInput)
    setActiveItemsInput(newactiveItemsInput)
    fetchData(
      `${
        process.env.NEXT_PUBLIC_FRONTEND_API_URL
      }/v3.0/search/advance?type=all&count=20&page=${page}&${search_param.toString()}`,
      setLoading
    ).then((result) => {
      if (result == null) {
        setSearchItems([])
        return
      }
      if (result.result_items[0].total == 0) {
        setSearchItems([])
        return
      }
      if (!result.result_items[0].groups.hasOwnProperty("Media")) {
        setSearchItems([])
        return
      }
      if (result.result_items[0].groups.Media.hasOwnProperty("items")) {
        setSearchItems([
          ...searchItems,
          ...result.result_items[0].groups.Media.items,
        ])

        if (result.result_items[0].groups.Media.items.length < 20) {
          setShow(false)
        }
      }
    })
  }, [page])

  const handleSearch = () => {
    let url = new URL(window.location.href)
    let search_param = new URLSearchParams(url.search)
    if (search_param.has("query")) {
      search_param.delete("query")
    }
    searchItemsInput.forEach((element) => {
      search_param.delete(element["queryKey"])
    })
    if (querySearch) {
      search_param.append("query", querySearch)
    }
    activeItemsInput.forEach((item) => {
      searchItemsInput.forEach((element) => {
        if (element["id"] == item) {
          search_param.append(element["queryKey"], element["queryValue"])
        }
      })
    })
    fetchData(
      `${
        process.env.NEXT_PUBLIC_FRONTEND_API_URL
      }/v3.0/search/advance?type=all&count=20&page=1&${search_param.toString()}`,
      setLoading
    ).then((result) => {
      if (result == null) {
        setSearchItems([])
        return
      }
      setSearchItems(result.result_items[0].groups.Media.items)
      if (result.result_items[0].groups.Media.items.length < 20) {
        setShow(false)
      }
    })

    router.push(`/search?${search_param.toString()}`)
  }
  return (
    <>
      <section style={{ marginTop: "100px" }} id="search">
        <div className="season-title">
          <ul className="search-items">
            <li className="search-all">
              <a>همه</a>
              <a>سینمایی</a>
              <a>سریال</a>
            </li>
            {searchItemsInput.map((searchItem, index) => (
              <li key={index}>
                <a>
                  {searchItem.title}
                  <i
                    className={`fa-solid fa-toggle-${
                      searchItem.isActive ? "on" : "off"
                    }`}
                    style={
                      searchItem.isActive
                        ? { color: "rgb(232, 129, 3)" }
                        : { color: "rgb(142, 142, 142)" }
                    }
                    onClick={() =>
                      changeInputStyleStep1(
                        searchItem.id,
                        activeItemsInput,
                        setActiveItemsInput
                      )
                    }
                  ></i>
                </a>
              </li>
            ))}
            <li className="search-input">
              <input
                type="text"
                onChange={(e) => setQuerySearch(e.target.value)}
              />
              <a>
                <i className="fa-solid fa-magnifying-glass"></i>
              </a>
            </li>
            <li className="search-action-btn">
              <button onClick={handleSearch}>جست و جو</button>
            </li>
          </ul>
        </div>
        <div></div>
      </section>
      <section>
        {loading && (
          <div className="search__loading">
            <Ping size={100} speed={2} color="#fff" />
          </div>
        )}
      </section>
      <section>
        <div className="search-content">
          <>
            {searchItems.length > 0 &&
              searchItems.map((searchItem, index) => (
                <SearchItem
                  key={index}
                  searchItem={searchItem}
                  loading={loading}
                />
              ))}
          </>
        </div>
      </section>
      {show && (
        <section>
          {searchItems.length > 0 && (
            <div className="more-search-btn">
              <a onClick={() => setPage(page + 1)}>
                <span>بیشتر</span>{" "}
              </a>
            </div>
          )}
        </section>
      )}
    </>
  )
}
export default Search
