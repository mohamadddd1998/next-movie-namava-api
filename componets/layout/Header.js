"use client"
import { useContext, useEffect, useState } from "react"
import { fetchData } from "@/lib/helper"
import SliderContext from "@/context/SliderContext"
import Link from "next/link"
import Image from "next/legacy/image"
import logo from "@/public/image/zarfilmlogo.png"
import { usePathname, useRouter } from "next/navigation"
import SearchContext from "@/context/SearchContext"

const Header = () => {
  const [menus, setMenus] = useState([])
  const { videoUrl, setVideoUrl } = useContext(SliderContext)
  const router = useRouter()
  const pathname = usePathname()
  const { setSearchItems, setLoading, setActiveItemsInput, searchItems } =
    useContext(SearchContext)

  useEffect(() => {
    fetchData(
      `${process.env.NEXT_PUBLIC_FRONTEND_API_URL}/v4.0/menus`,
      () => {}
    ).then((result) => {
      let newResult = result.filter((item) => {
        return item.parentId == 1
      })
      setMenus(newResult.slice(0,3))
    })
  }, [])
  useEffect(() => {
    let lastScrollTop = 0
    const header = document.getElementsByTagName("header")[0]
    window.addEventListener("scroll", function () {
      if (window.scrollY > 75) {
        header.style.top = "-100px"
      } else {
        header.style = {
          top: "0px",
        }
      }
      let currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollTop < lastScrollTop) {
        header.style = {
          top: "0px",
        }
      }
      lastScrollTop = currentScrollTop
      return () => {
        window.removeEventListener("scroll")
      }
    })
  }, [])

  const removeDarkBody = () => {
    document.getElementById("dark_body").classList.remove("dark_body")
    setVideoUrl(null)
  }
  const handleSearchRoute = () => {
    router.push("/search")
    setSearchItems([])
    fetchData(
      `${process.env.NEXT_PUBLIC_FRONTEND_API_URL}/v3.0/search/advance?type=all&count=20&page=1`,
      setLoading
    ).then((result) => {
      if (result == null) {
        setSearchItems([])
        return
      }
      setActiveItemsInput([])
      setSearchItems(result.result_items[0].groups.Media.items)
    })
  }

  return (
    <>
      <div id="dark_body" onClick={removeDarkBody}></div>
      {videoUrl && (
        <a id="close_video" onClick={removeDarkBody}>
          <i className="fa-solid fa-xmark"></i>
        </a>
      )}
      {videoUrl && (
        <div id="preview_video">
          <video controls>
            <source
              src={`${process.env.NEXT_PUBLIC_BACKEND_HREF}${videoUrl}`}
              type="video/mp4"
            />
          </video>
        </div>
      )}

      <nav className="mobile-menu">
        <Link href={"/"}>
          <i
            className={`fa-solid fa-house ${
              pathname == "/" ? "mobile-menu-visited-link" : ""
            }`}
          ></i>
          <span>خانه</span>
        </Link>
        <Link href={"/search"}>
          <i
            className={`fa-solid fa-magnifying-glass ${
              pathname == "/search" ? "mobile-menu-visited-link" : ""
            }`}
          ></i>
          <span>جستوجو</span>
        </Link>
      </nav>

      <header>
        {menus.length > 0 && (
          <>
            <nav>
              {menus.map((menu, index) => (
                <Link key={index} href={"/"}>
                  {menu.caption}
                </Link>
              ))}
            </nav>
            <a className="humber-icon">
              <i className="fa-solid fa-bars"></i>
            </a>
            <div style={{ display: "flex" }}>
              <div className="search-logo">
                <a onClick={handleSearchRoute}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </a>
              </div>
              <div className="logo">
                <figure>
                  <Link href={"/"}>
                    <Image src={logo} alt="logo" width={100} height={30} />
                  </Link>
                </figure>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  )
}
export default Header
