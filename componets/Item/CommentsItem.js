import { getDate } from "@/lib/helper"

const CommentsItem = ({ comment }) => {
  return (
    <div className="comment">
      <div className="commnet-title">
        <a className="comment-avatar">
          <i className="fa-solid fa-user"></i>
        </a>
        <nav>
          <a style={{ color: "#cccccc" }}>{comment.profileCaption}</a>
          <span style={{ color: "#cccccc" }}>{" - "}</span>
          <a style={{ color: "#cccccc" }}>
            {getDate(comment["createDateUTC"])}
          </a>
        </nav>
      </div>
      <p className="comment-text">{comment.body}</p>
      <div className="comment-feedback">
        <nav className="comment-like-dislike">
          <a>
            {comment.commentLikeDislike.dislikeCount}
            <i className="fa-regular fa-thumbs-down"></i>
          </a>
          <a>
            {comment.commentLikeDislike.likeCount}
            <i className="fa-regular fa-thumbs-up"></i>
          </a>
        </nav>
        <nav className="comment-reply">
          <a>
            پاسخ
            <i className="fa-solid fa-reply fa-flip-horizontal"></i>
          </a>
        </nav>
      </div>
    </div>
  )
}
export default CommentsItem
