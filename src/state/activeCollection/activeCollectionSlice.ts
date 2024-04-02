import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type activeCollectionType = {
    activeCollection: string | null
}

const initialState: activeCollectionType = {
    activeCollection: null
}

const activeCollectionSlice = createSlice({
    name: "activeCollection",
    initialState,
    reducers: {
        changeActiveCollection: (state, action: PayloadAction<string>) => {
            state.activeCollection = action.payload
        },
        resetActiveCollection: (state) => {
            state.activeCollection = null
        }
    }
})

export const { changeActiveCollection, resetActiveCollection } = activeCollectionSlice.actions

export default activeCollectionSlice.reducer
