import { ClientFlashCardType, FlashCardType, WordCollection } from "@/types/types"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export type EditedWordCollection = {
    collectionId: string | null
    title: string
    author: string
    flashcards: FlashCardType[]
    updatedCards: FlashCardType[]
    newCards: FlashCardType[]
    deletedCards: string[]
}

const initialState: EditedWordCollection = {
    collectionId: null,
    title: '',
    author: '',
    flashcards: [],
    updatedCards: [],
    newCards: [],
    deletedCards: []
}

const editedCollectionSlice = createSlice({
    name: "editedCollection",
    initialState,
    reducers: {
        initEditedCollection: (state, action: PayloadAction<{ author: string, title: string, collectionId: string, flashcards: FlashCardType[] }>) => {
            state.author = action.payload.author
            state.title = action.payload.title
            state.collectionId = action.payload.collectionId
            state.flashcards = action.payload.flashcards
            state.deletedCards = []
            state.newCards = []
            state.updatedCards = []
        },
        addFlashcard: (state, action: PayloadAction<ClientFlashCardType>) => {
            const flashcard: FlashCardType = { ...action.payload, EF: 2.5, repetition: 0, repetitionTime: Date.now(), interval: 1 }
            state.newCards.push(flashcard)
            state.flashcards.push(flashcard)
        },
        deleteFlashcard: (state, action: PayloadAction<number>) => {
            const flashcardToDelete = state.flashcards[action.payload]
            const newCardsIndex = state.newCards.findIndex((el) => el._id === flashcardToDelete._id)
            if (newCardsIndex !== -1) {
                state.newCards.splice(newCardsIndex, 1)
            }
            else {
                state.deletedCards.push(flashcardToDelete._id)
            }
            const updatedCardsIndex = state.updatedCards.findIndex((el) => el._id === flashcardToDelete._id)
            if (updatedCardsIndex !== -1) {
                state.updatedCards.splice(updatedCardsIndex, 1)
            }
            state.flashcards.splice(action.payload, 1)
        },
        editFlashcard: (state, action: PayloadAction<{ flashcardIndex: number, flashcard: FlashCardType }>) => {
            const { flashcardIndex, flashcard } = action.payload

            const newCardsIndex = state.newCards.findIndex((el) => el._id === flashcard._id)
            if (newCardsIndex !== -1) {
                state.newCards[newCardsIndex].russian = flashcard.russian
                state.newCards[newCardsIndex].english = flashcard.english
            }
            else {
                const updatedCardsIndex = state.updatedCards.findIndex((el) => el._id === flashcard._id)
                if (updatedCardsIndex === -1) {
                    state.updatedCards.push(flashcard)
                }
            }

            state.flashcards[flashcardIndex].russian = flashcard.russian
            state.flashcards[flashcardIndex].english = flashcard.english
        },
        // deleteCollection: (state) => {
        //     if (state.collectionId) {
        //         deleteCollectionDB(state.collectionId)
        //         state.flashcards = []
        //         state.collectionId = null
        //         state.title = ''
        //         state.author = ''
        //         state.deletedCards = []
        //         state.newCards = []
        //         state.updatedCards = []
        //     }
        // },
        resetCollection: () => {
            return {
                collectionId: null,
                title: '',
                author: '',
                flashcards: [],
                updatedCards: [],
                newCards: [],
                deletedCards: []
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateCollection.pending, () => {
                console.log('updatingCollection pending')
            })
            .addCase(updateCollection.fulfilled, (state, action: PayloadAction<WordCollection | undefined>) => {
                if (action.payload) {
                    state.collectionId = action.payload._id
                    state.author = action.payload.author
                    state.title = action.payload.title
                    state.flashcards = action.payload.flashcards
                    state.updatedCards = []
                    state.newCards = []
                    state.deletedCards = []
                }
                else {
                    console.log('Ошибка добавления новой коллекции')
                }
            })
    }
})

export const updateCollection = createAsyncThunk(
    'editedCollection/updateCollection',
    async ({ collectionId, newCards, deletedCards, updatedCards }: { collectionId: string, newCards: FlashCardType[], deletedCards: string[], updatedCards: FlashCardType[] }) => {
        try {
            const request = { newCards, deletedCards, updatedCards }
            const { data }: { data: WordCollection } = await axios.patch(`/api/collection/${collectionId}`, request)
            return data as WordCollection
        }
        catch (e) {
            console.log("Ошибка изменения коллекции")
        }
    }
)

export const { initEditedCollection, addFlashcard, deleteFlashcard, editFlashcard, resetCollection } = editedCollectionSlice.actions

export default editedCollectionSlice.reducer
