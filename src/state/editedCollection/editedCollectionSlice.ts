import { FlashCardClientType, FlashCardType, WordCollection } from "@/types/types"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export type EditedWordCollection = {
    collectionId: string | null
    title: string
    author: string
    flashcards: FlashCardClientType[]
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
        addFlashcard: (state, action: PayloadAction<FlashCardClientType>) => {
            state.flashcards.push(action.payload)
        },
        deleteFlashcard: (state, action: PayloadAction<number>) => {
            state.flashcards.splice(action.payload, 1)
        },
        editFlashcard: (state, action: PayloadAction<{ flashcardIndex: number, flashcard: FlashCardClientType }>) => {
            const { flashcardIndex, flashcard } = action.payload
            state.flashcards[flashcardIndex].russian = flashcard.russian
            state.flashcards[flashcardIndex].english = flashcard.english
        },
        deleteCollection: (state, action: PayloadAction<{ userId: string }>) => {
            const { userId } = action.payload
            if (state.collectionId) {
                deleteCollectionDB(state.collectionId, userId)
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
                    state.flashcards = action.payload.flashcards.map((element) => ({ english: element.english, russian: element.russian }))
                }
                else {
                    console.log('Ошибка добавления новой коллекции')
                }
            })
    }
})

const deleteCollectionDB = async (collectionId: string, userId: string) => {

    try {
        const response = await fetch(`http://localhost:3000/api/collection/${collectionId}`, {
            cache: "no-store",
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
        if (!response.ok) {
            console.log("Ошибка удаления коллекции")
        }
    }
    catch (e) {
        console.log("Ошибка удаления коллекции")
    }
}

export const updateCollection = createAsyncThunk(
    'editedCollection/updateCollection',
    async ({ collectionId, flashcards }: { collectionId: string, flashcards: FlashCardClientType[] }) => {
        try {
            const request = { flashcards }
            const response = await fetch(`http://localhost:3000/api/collection/${collectionId}`, {
                cache: "no-store",
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(request)
            })
            if (!response.ok) {
                console.log("Ошибка изменения коллекции")
            }
            const collection = await response.json()
            return collection
        }
        catch (e) {
            console.log("Ошибка изменения коллекции")
        }
    }
)

export const { initEditedCollection, addFlashcard, deleteFlashcard, editFlashcard, deleteCollection, resetCollection } = editedCollectionSlice.actions

export default editedCollectionSlice.reducer
