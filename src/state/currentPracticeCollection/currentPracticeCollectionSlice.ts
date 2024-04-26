import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type PracticeFlashCardType = {
    english: string
    russian: string
}

export type CurrentPracticeCollection = {
    collectionLink: string | null
    flashcards: PracticeFlashCardType[]
}

const initialState: CurrentPracticeCollection = {
    collectionLink: null,
    flashcards: [],
}

const currentPracticeCollectionSlice = createSlice({
    name: "currentPracticeCollection",
    initialState,
    reducers: {
        initCurrentPracticeCollection: (state, action: PayloadAction<{ collectionLink: string, flashcards: PracticeFlashCardType[] }>) => {
            state.collectionLink = action.payload.collectionLink
            state.flashcards = action.payload.flashcards
        },
        updateCurrentPracticeFlashcards: (state, action: PayloadAction<{ flashcards: PracticeFlashCardType[] }>) => {
            state.flashcards = action.payload.flashcards
        },
        resetCurrentPracticeCollection: () => {
            return {
                collectionLink: null,
                flashcards: [],
            }
        }
    },
})

export const { initCurrentPracticeCollection, updateCurrentPracticeFlashcards, resetCurrentPracticeCollection } = currentPracticeCollectionSlice.actions

export default currentPracticeCollectionSlice.reducer
