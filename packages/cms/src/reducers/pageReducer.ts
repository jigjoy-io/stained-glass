import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { updatePage } from "../api/page"

interface PageState {
    pageId: string
    page: any
    mode: string,
    activeSelector: string | null
}

let initialState: PageState = {
    pageId: "01858c7d-17dc-4c64",
    page: null,
    mode: "visiting",
    activeSelector: null
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,

    reducers: {

        loadPage: (state, action: PayloadAction<any>) => {
            state.pageId = action.payload
        },

        pageUpdated: (state, action: PayloadAction<any>) => {
            state.page = action.payload
        },

        insertBlock: (state, action: PayloadAction<any>) => {
            let page = JSON.parse(JSON.stringify(state.page))

            let referenceBlockIndex = page.buildingBlocks.findIndex((block: any) => block.id == action.payload.referenceBlock)
            let index = action.payload.position === 'above' ? referenceBlockIndex : referenceBlockIndex + 1
            page.buildingBlocks.splice(index, 0, action.payload.newBlock)

            state.page = page
            updatePage(page)
        },

        updateBlock: (state, action: PayloadAction<any>) => {
            let page = JSON.parse(JSON.stringify(state.page))

            let index = page.buildingBlocks.findIndex((block: any) => block.id == action.payload.id)
            page.buildingBlocks[index] = action.payload

            state.page = page
            updatePage(page)
        },

        removeBlock: (state, action: PayloadAction<string>) => {
            state.page.buildingBlocks = state.page.buildingBlocks.filter((block: any) => block.id !== action.payload)

            updatePage(state.page)
        },

        focusSelector: (state, action: PayloadAction<any>) => {
            state.activeSelector = action.payload
        },

        modeUpdated: (state, action: PayloadAction<any>) => {
            state.mode = action.payload
        }
    }
})

export const { pageUpdated, modeUpdated, loadPage, insertBlock, updateBlock, removeBlock, focusSelector } = pageSlice.actions


export default pageSlice.reducer