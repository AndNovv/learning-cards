import { ClientFlashCardType, FlashCardType, WordCollection } from "@/types/types"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export type EditedWordCollection = {
    collectionId: string | null
    title: string
    author: string
    flashcards: FlashCardType[]
}

const initialState: EditedWordCollection = {
    collectionId: null,
    title: '',
    author: '',
    flashcards: []
}

const editedCollectionSlice = createSlice({
    name: "editedCollection",
    initialState,
    reducers: {
        initEditedCollection: (state, action: PayloadAction<EditedWordCollection>) => {
            state.author = action.payload.author
            state.title = action.payload.title
            state.collectionId = action.payload.collectionId
            state.flashcards = action.payload.flashcards
        },
        addFlashcard: (state, action: PayloadAction<ClientFlashCardType>) => {
            state.flashcards.push({ ...action.payload, EF: 2.5, repetition: 0, repetitionTime: Date.now(), interval: 1 })
        },
        deleteFlashcard: (state, action: PayloadAction<number>) => {
            state.flashcards.splice(action.payload, 1)
        },
        editFlashcard: (state, action: PayloadAction<{ flashcardIndex: number, flashcard: FlashCardType }>) => {
            const { flashcardIndex, flashcard } = action.payload
            state.flashcards[flashcardIndex].russian = flashcard.russian
            state.flashcards[flashcardIndex].english = flashcard.english
        },
        deleteCollection: (state) => {
            if (state.collectionId) {
                deleteCollectionDB(state.collectionId)
                state.flashcards = []
                state.collectionId = null
                state.title = ''
                state.author = ''
            }
        },
        resetCollection: () => {
            return {
                collectionId: null,
                title: '',
                author: '',
                flashcards: []
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
                }
                else {
                    console.log('Ошибка добавления новой коллекции')
                }
            })
    }
})

const deleteCollectionDB = async (collectionId: string) => {

    try {
        await axios.delete(`/api/collection/${collectionId}`)
    }
    catch (e) {
        console.log("Ошибка удаления коллекции")
    }
}

export const updateCollection = createAsyncThunk(
    'editedCollection/updateCollection',
    async ({ collectionId, flashcards }: { collectionId: string, flashcards: FlashCardType[] }) => {
        try {
            const request = { flashcards }
            const { data }: { data: WordCollection } = await axios.patch(`/api/collection/${collectionId}`, request)
            return data as WordCollection
        }
        catch (e) {
            console.log("Ошибка изменения коллекции")
        }
    }
)

export const { initEditedCollection, addFlashcard, deleteFlashcard, editFlashcard, deleteCollection, resetCollection } = editedCollectionSlice.actions

export default editedCollectionSlice.reducer
