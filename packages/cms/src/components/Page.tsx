import React, { useState, useEffect } from "react"
import { usePage } from "../util/store"
import { PageFactory } from "../factories/PageFactory"
import Loader from "../components/loader/Loader"

function Page() {
  const page = usePage()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    if (page != null) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [page])

  if (isLoading) {
    return (
      <div className="grow flex flex-col justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="grow flex flex-col justify-center items-center">
      {PageFactory.get(page)}
    </div>
  )
}

export default Page