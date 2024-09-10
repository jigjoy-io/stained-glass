import React from "react"
import { usePage } from "../../util/store"
import Content from "../PageContent"


export default function BlankPage() {

    const page: any = usePage()

    return <>{(page.config) && <div className="flex flex-col max-h-[100dvh] h-[100dvh] w-[100%]">
        <div className="h-[100%] overflow-y-auto flex justify-center">
            <Content config={page.config} key={page.id} id={page.id} />
        </div>
    </div>}
    </>
}