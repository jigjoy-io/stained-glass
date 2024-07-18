import React from "react"
import { usePage } from "../util/store"
import { PageFactory } from "../factories/PageFactory"

function Page() {

    const page = usePage()

    return <>{
        <div className="min-w-[100dvw] md:min-w-[400px] md:max-w-[400px] lg:max-h-[100dvh] h-[100dvh]">
            {page != null && PageFactory.get(page)}
        </div>
    }</>
}


export default Page