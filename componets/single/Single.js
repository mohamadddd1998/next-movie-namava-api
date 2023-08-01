"use client"
import { getActors, getDirectors } from "@/lib/helper"
import styled from "styled-components"

const Single = ({ item }) => {
  const SingleDiv = styled.div`
    background-image:url(${(props) => props.coverLandscape});
     @media (max-width: 600px) {
      background-image:url(${(props) => props.coverPortrait});
    }`
  return (
    <>
      <section className="single_section">
        <SingleDiv
          className="single"
          coverLandscape={`https://namava.ir${item.coverLandscape}`}
          coverPortrait={`https://namava.ir${item.coverPortrait}`}
        >
          <h2 className="single_title">{item.caption}</h2>
          <nav className="single_details">
            <a className="pardis">پردیس نماوا</a>
            <a className="age">{item.ageRange.value}+</a>
            {item.year && <a>{item.year}</a>}
            {item.mediaDuration && <a>{item.mediaDuration} دقیقه</a>}
            {item.imdb && (
              <a>
                <i className="fa-brands fa-mdb"></i>
                {item.imdb}
              </a>
            )}
            {item.hit != 0 && (
              <a>
                <i className="fa fa-heart"></i>
                {item.hit}%
              </a>
            )}
          </nav>
          <p className="single_desc">{item.story}</p>
          <div className="single_btn">
            {item.type == "Series" && (
              <button className="single_btn_buy">قسمت ها</button>
            )}
            {item.type == "PurchasableMovie" && (
              <button className="single_btn_buy">خرید بلیط</button>
            )}
            {item.type == "Movie" && (
              <button className="single_btn_buy">ورود و پخش</button>
            )}
          </div>
          {getActors(item.casts).length > 0 && (
            <nav className="single_actors">
              <span className="single_actors_title">ستارگان : </span>
              {getActors(item.casts).map((actor, index) => (
                <span key={index}>
                  {actor.castName}
                  {index == getActors(item.casts).length - 1 ? "" : " - "}
                </span>
              ))}
            </nav>
          )}
          {getDirectors(item.casts).length > 0 && (
            <nav className="single_director">
              <span className="single_director_title">کارگردان : </span>
              {getDirectors(item.casts).map((director, index) => (
                <span key={index}>
                  {director.castName}
                  {index == getDirectors(item.casts).length - 1 ? "" : " - "}
                </span>
              ))}
            </nav>
          )}
          <nav className="single_category">
            <span className="single_director_category">دسته بندی : </span>
            {item.categories.map((category, index) => (
              <span key={index}>
                {category.categoryName}
                {index == item.categories.length - 1 ? "" : " - "}
              </span>
            ))}
          </nav>
          <div className="cover"></div>
        </SingleDiv>
      </section>
    </>
  )
}
export default Single
