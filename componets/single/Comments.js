"use client"
import { fetchData } from "@/lib/helper"
import CommentsItem from "../Item/CommentsItem"
import { useEffect, useState } from "react"
import { Ping } from "@uiball/loaders"

const Comments = ({ item }) => {
  const [comments, setComments] = useState([])
  const [pi, setPi] = useState(1)
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(true)
  useEffect(() => {
    fetchData(
      `${process.env.NEXT_PUBLIC_FRONTEND_API_URL}/v1.0/comments?pi=${pi}&ps=6&mediaId=${item.id}&profileId=0`,
      setLoading
    ).then((result) => {
      setComments([...comments, ...result])
      if (result.length < 5) {
        setShow(false)
      }
    })
  }, [pi])
  return (
    <div className="comments">
      {comments.length > 0 &&
        comments.map((comment, index) => (
          <CommentsItem comment={comment} key={index} />
        ))}
      {show && (
        <nav className="comment-paginate">
          {loading ? (
            <Ping size={25} speed={2} color="#fff" />
          ) : (
            <a onClick={() => setPi(pi + 1)}>
              <span>بیشتر</span>{" "}
            </a>
          )}
        </nav>
      )}
    </div>
  )
}
export default Comments
