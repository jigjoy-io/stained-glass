import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import Page from "../../components/page"
import { rootPageUpdated } from "../../reducers/page-reducer"
import { AppDispatch, useBlocked, useModified, usePage, useRootPage } from "../../util/store"
import { updatePage } from "../../api/page"
import { replaceBlock } from "../../util/traversals/replace-block"
import LeftSideMenu from "./left-side-menu"
import { RightSideMenu } from "./right-side-menu"

export default function Designer() {

    const blocked = useBlocked()
    const page = usePage()
    const rootPage = useRootPage()
    const modified = useModified()
    const dispatch = useDispatch<AppDispatch>()


    const update = (rootPage, page) => {

        if (rootPage === null || page === null)
            return

        let root = JSON.parse(JSON.stringify(rootPage))
        let activePage = JSON.parse(JSON.stringify(page))

        root = replaceBlock(root, activePage)
        dispatch(rootPageUpdated(root))

        updatePage(root)
    }

    useEffect(() => {
        update(rootPage, page)

    }, [modified])

    return <div style={{ pointerEvents: blocked ? 'none' : 'auto' }}>

        <div className="flex flex-row">
            <LeftSideMenu />
            {page && <Page />}
        </div>

        <RightSideMenu />

    </div>
}