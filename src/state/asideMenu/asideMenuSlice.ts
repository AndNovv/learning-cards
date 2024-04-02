import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type asideMenuType = {
    visible: boolean | null
    isDesktop: boolean | null
}

const initialState: asideMenuType = {
    visible: null,
    isDesktop: null
}

const asideMenuSlice = createSlice({
    name: "asideMenu",
    initialState,
    reducers: {
        setVisibility: (state, action: PayloadAction<boolean>) => {
            state.visible = action.payload
        },
        setDevice: (state, action: PayloadAction<boolean>) => {
            state.isDesktop = action.payload
        },
        resetVisibility: (state) => {
            state.visible = null
        }
    }
})

export const { setVisibility, resetVisibility, setDevice } = asideMenuSlice.actions

export default asideMenuSlice.reducer