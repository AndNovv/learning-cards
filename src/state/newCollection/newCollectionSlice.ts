import { FlashCardType, WordCollection } from "@/types/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: WordCollection = {
    _id: '',
    title: '',
    author: '',
    flashcards: []
}

const newCollectionSlice = createSlice({
    name: "newCollection",
    initialState,
    reducers: {
        addFlashcard: (state, action: PayloadAction<FlashCardType>) => {
            state.flashcards.push(action.payload)
        },
        deleteFlashcard: (state, action: PayloadAction<number>) => {
            state.flashcards.splice(action.payload, 1)
        },
        editFlashcard: (state, action: PayloadAction<{ flashcardIndex: number, flashcard: FlashCardType }>) => {
            state.flashcards[action.payload.flashcardIndex].english = action.payload.flashcard.english
            state.flashcards[action.payload.flashcardIndex].russian = action.payload.flashcard.russian
        },
        resetCollection: () => {
            return {
                _id: '',
                title: '',
                author: '',
                flashcards: []
            }
        }
    }
})

export const { addFlashcard, deleteFlashcard, editFlashcard, resetCollection } = newCollectionSlice.actions

export default newCollectionSlice.reducer
