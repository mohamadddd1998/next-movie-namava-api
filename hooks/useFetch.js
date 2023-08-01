"use client"
import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = async (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true)
        const response = await axios.get(url)

        if (response.data.succeeded) {
          let newResult = response.data.result.filter((item) => {
            return item.parentId == 1
          })
          setData(newResult)
        }
      } catch (error) {
        setError(true)
      } finally {
        setLoading(true)
      }
    }
    fetchMenu()
  }, [])

  return { data, loading, error }
}
export default useFetch
