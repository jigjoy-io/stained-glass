import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getPages } from "../../api/page"
import Button from "../../components/button/Button"
import { AddBlockIcon } from "../../icons/AddBlockIcon"
import { CopyLinkIcon } from "../../icons/CopyLinkIcon"
import { pagesUpdated } from "../../reducers/pageReducer"
import { useAccount, usePages } from "../../util/store"
import { Node } from './Node'

export default function PageTree() {


    const account = useAccount()
    const pages = usePages()


    const dispatch = useDispatch()

    async function fetchData() {
        let pages = await getPages(account)
        dispatch(pagesUpdated(pages))
    }

    useEffect(() => {
        fetchData()
    }, [])




    return <div className="h-[100dvh] w-[260px] bg-[#F2EEF0] bg-opacity-40 border-r border-light shadow-lg">
        {
            pages.length > 0 && <div className="h-full flex flex-col">



                <div className="w-full grow mt-10 overflow-y-auto">
                    <div>
                        <div className="m-1 px-3 py-2 flex flex-row items-center hover:bg-primary-light hover:bg-opacity-60 rounded-sm cursor-pointer">
                            <AddBlockIcon /><div className="font-bold">Start New Project</div>
                        </div>
                    </div>
                    <div className='border-b border-primary mx-3' />
                    <div className="px-3 py-2 font-bold text-sm">
                        Drafts
                    </div>
                    <div className="flex flex-col">
                        {
                            pages.map((page) => <Node {...page} />)}
                    </div>
                </div>

                <div>
                    <div>
                        <div className="mx-3 px-3 py-2 flex flex-row items-center hover:bg-primary-light hover:bg-opacity-60 rounded-sm cursor-pointer">
                            <CopyLinkIcon /><div>Copy live link</div>
                        </div>
                    </div>
                    <div className="w-full py-2">
                        <div className="w-[100%] px-3 py-1">
                            <Button text="Preview draft" color="default" />
                        </div>
                        <div className="w-[100%] px-3 py-1">
                            <Button text="Publish" />
                        </div>
                    </div>

                </div>


            </div>
        }

    </div>
}