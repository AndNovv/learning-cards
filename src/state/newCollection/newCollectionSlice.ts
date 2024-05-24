import { ClientFlashCardType, ClientWordCollection } from "@/types/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: ClientWordCollection = {
    title: '',
    author: '',
    authorId: '',
    flashcards: []
}

const newCollectionSlice = createSlice({
    name: "newCollection",
    initialState,
    reducers: {
        addFlashcard: (state, action: PayloadAction<ClientFlashCardType>) => {
            state.flashcards.push(action.payload)
        },
        deleteFlashcard: (state, action: PayloadAction<number>) => {
            state.flashcards.splice(action.payload, 1)
        },
        editFlashcard: (state, action: PayloadAction<{ flashcardIndex: number, flashcard: ClientFlashCardType }>) => {
            state.flashcards[action.payload.flashcardIndex].english = action.payload.flashcard.english
            state.flashcards[action.payload.flashcardIndex].russian = action.payload.flashcard.russian
        },
        resetCollection: () => {
            return {
                title: '',
                author: '',
                authorId: '',
                flashcards: []
            }
        }
    }
})

export const { addFlashcard, deleteFlashcard, editFlashcard, resetCollection } = newCollectionSlice.actions

export default newCollectionSlice.reducer
