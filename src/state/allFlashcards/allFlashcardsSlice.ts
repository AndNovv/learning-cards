import { FlashCardType, WordCollection } from "@/types/types"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { updateFlashcards } from '@/state/user/userSlice'
import { RootState } from "../store"

interface AllFlashcards {
    flashcards: FlashCardType[] | null,
    updatedCards: FlashCardType[]
}

const initialState: AllFlashcards = {
    flashcards: null,
    updatedCards: []
}

const allFlashcardsSlice = createSlice({
    name: "allFlashcards",
    initialState,
    reducers: {
        initializeAllFlashcards: (state, action: PayloadAction<WordCollection[]>) => {
            let allFlashcards: FlashCardType[] = []
            console.log('initializeAllFlashcards')
            console.log(allFlashcards)
            action.payload.forEach((collection) => {
                allFlashcards = [...allFlashcards, ...collection.flashcards]
            });
            console.log(allFlashcards)
            allFlashcards.sort((a, b) => a.repetitionTime - b.repetitionTime)
            console.log(allFlashcards)

            if (allFlashcards.length > 0) {
                let index = 0
                while (allFlashcards[index].repetitionTime < Date.now()) {
                    index++
                    if (index >= allFlashcards.length) {
                        break
                    }
                }
                if (index === 0) {
                    state.flashcards = []
                }
                else if (index < allFlashcards.length) {
                    allFlashcards.splice(index)
                    state.flashcards = allFlashcards
                }
            }
            console.log(allFlashcards)
            console.log(state.flashcards)
            state.updatedCards = []
        },
        addUpdatedCard: (state, action: PayloadAction<FlashCardType>) => {
            state.updatedCards.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(applyUpdatedCards.pending, (state) => {
                state.flashcards = null
            })
    }
})

export const applyUpdatedCards = createAsyncThunk(
    'allFlashcards/applyUpdatedCards',
    async (_, { getState, dispatch }) => {
        const { allFlashcards } = getState() as RootState
        const updatedCards = allFlashcards.updatedCards
        if (updatedCards.length > 0) {

            // Обновляем карты на клиенте
            dispatch(updateFlashcards(updatedCards))

            // Обновляем карты на сервере
            try {
                const request = { updatedCards }
                const { data } = await axios.patch('api/flashcard', request)
                return data
            }
            catch (e) {
                console.log("Ошибка обновления карточек")
            }
        }
    }
)


export const { initializeAllFlashcards, addUpdatedCard } = allFlashcardsSlice.actions

export default allFlashcardsSlice.reducer
