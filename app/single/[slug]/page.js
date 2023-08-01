import Actors from "@/componets/single/Actors"
import End from "@/componets/single/End"
import Season from "@/componets/single/Season"
import Single from "@/componets/single/Single"
import Title from "@/componets/single/Title"
import { getActors, typeSingleUrl } from "@/lib/helper"
import axios from "axios"

const getData = async (id, slug) => {
  const response = await axios.get(
    `${process.env.FRONTEND_API_URL}/v2.0/medias/${id}/single-${typeSingleUrl(
      slug
    )}`
  )
  if (response.data.succeeded) {
    return response.data.result
  }
}

const SinglePage = async ({ params }) => {
  const [id, slug] = params.slug.split("-")
  const singleMedia = await getData(id, slug)
  return (
    <>
      <Single item={singleMedia} toggle={false} />
      {typeSingleUrl(slug) == "series" && singleMedia.seasons.length > 0 && (
        <>
          <Title seasons={singleMedia.seasons} />{" "}
          <Season seasons={singleMedia.seasons} />
        </>
      )}
      {getActors(singleMedia.casts).length > 0 && (
        <Actors actors={getActors(singleMedia.casts)} />
      )}
      <End item={singleMedia} />
      <div style={{ marginBottom: "50px" }}></div>
    </>
  )
}
export default SinglePage
