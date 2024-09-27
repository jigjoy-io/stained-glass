import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SidebarState {
    expanded: boolean
}

let initialState: SidebarState = {
    expanded: false
}


export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,

    reducers: {

        sidebarExpanded: (state, action: PayloadAction<boolean>) => {
            state.expanded = action.payload
        }
    }
})

export const { sidebarExpanded } = sidebarSlice.actions


export default sidebarSlice.reducer