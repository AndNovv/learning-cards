import { FlashCardClientType, WordCollectionClient } from "@/types/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: WordCollectionClient = {
    title: '',
    author: '',
    flashcards: []
}

const newCollectionSlice = createSlice({
    name: "newCollection",
    initialState,
    reducers: {
        addFlashcard: (state, action: PayloadAction<FlashCardClientType>) => {
            state.flashcards.push(action.payload)
        },
        deleteFlashcard: (state, action: PayloadAction<number>) => {
            state.flashcards.splice(action.payload, 1)
        },
        editFlashcard: (state, action: PayloadAction<{ flashcardIndex: number, flashcard: FlashCardClientType }>) => {
            state.flashcards[action.payload.flashcardIndex].english = action.payload.flashcard.english
            state.flashcards[action.payload.flashcardIndex].russian = action.payload.flashcard.russian
        },
        resetCollection: () => {
            return {
                title: '',
                author: '',
                flashcards: []
            }
        }
    }
})

export const { addFlashcard, deleteFlashcard, editFlashcard, resetCollection } = newCollectionSlice.actions

export default newCollectionSlice.reducer
