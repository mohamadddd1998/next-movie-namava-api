import Comments from "./Comments"
import Related from "./Related"

const End = ({ item }) => {
  return (
    <section>
      <div className="actors-title" style={{ marginTop: "50px" }}>
        <h3>کامنت ها و فیلم های مرتبط</h3>
      </div>
      <div className="end">
        <Comments item={item} />
        <Related item={item} />
      </div>
    </section>
  )
}
export default End
