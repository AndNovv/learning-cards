import { WordCollection, ClientWordCollection, FlashCardType } from "@/types/types"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { RootState } from "../store"

export interface User {
    _id: string
    name: string
    email: string
    collections: WordCollection[]
}

interface UserDataState {
    user: User
    loading: boolean
    error: string | null
}

const initialState: UserDataState = {
    user: {
        _id: '',
        name: '',
        email: '',
        collections: []
    },
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addCollectionToUser: (state, action: PayloadAction<WordCollection>) => {
            state.user.collections.push(action.payload)
            addCollectionToUserDB(state.user._id, action.payload._id)
        },
        deleteCollectionFromUser: (state, action: PayloadAction<string>) => {
            const index = state.user.collections.findIndex((element) => element._id === action.payload)
            state.user.collections.splice(index, 1)
            deleteCollectionFromUserDB(state.user._id, action.payload)
        },
        editCollection: (state, action: PayloadAction<WordCollection>) => {
            const index = state.user.collections.findIndex((element) => element._id === action.payload._id)
            state.user.collections[index] = action.payload
        },
        updateCollections: (state, action: PayloadAction<WordCollection[]>) => {
            state.user.collections = action.payload
        },
        updateFlashcards: (state, action: PayloadAction<FlashCardType[]>) => {
            const flashcardsMap = new Map(action.payload.map((flashcard) => [flashcard._id, flashcard]))
            for (let i = 0; i < state.user.collections.length; i++) {
                for (let j = 0; j < state.user.collections[i].flashcards.length; j++) {
                    const flashcard = flashcardsMap.get(state.user.collections[i].flashcards[j]._id)
                    if (flashcard) {
                        state.user.collections[i].flashcards[j] = flashcard
                    }
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true
                console.log('fetchingUser pending')
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User | undefined>) => {
                if (action.payload) {
                    state.user._id = action.payload._id
                    state.user.name = action.payload.name
                    state.user.email = action.payload.email
                    state.user.collections = action.payload.collections
                }
                else {
                    state.error = "Ошибка получения информации о пользователе"
                }
                state.loading = false
            })
            .addCase(createNewCollectionAndAddToUser.pending, (state) => {
                state.loading = true
                console.log('createNewCollectionAndAddToUser pending')
            })
            .addCase(createNewCollectionAndAddToUser.fulfilled, (state, action: PayloadAction<WordCollection | undefined>) => {
                if (action.payload) {
                    state.user.collections.push(action.payload)
                }
                else {
                    state.error = "Ошибка добавления Коллекции"
                }
                state.loading = false
            })
    }
})

const addCollectionToUserDB = async (userId: string, collectionId: string) => {
    try {
        const request = { userId, collectionId }
        await axios.post(`/api/user/collection`, request)
    }
    catch (e) {
        console.log("Ошибка добавления коллекции")
    }
}

const deleteCollectionFromUserDB = async (userId: string, collectionId: string) => {
    try {
        const request = { userId, collectionId }
        await axios.patch(`/api/user/collection`, request)
    }
    catch (e) {
        console.log("Ошибка удаления коллекции")
    }
}


export const createNewCollectionAndAddToUser = createAsyncThunk(
    'user/createNewCollectionAndAddToUser',
    async ({ userId, collection }: { userId: string, collection: ClientWordCollection }) => {
        try {
            const request = collection
            const { data } = await axios.post(`/api/collection`, request)
            const newCollection: WordCollection = data

            await addCollectionToUserDB(userId, newCollection._id)
            return newCollection as WordCollection
        }
        catch (e) {
            console.log(e)
        }
    }
)

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (email: string) => {
        try {
            const { data, status } = await axios(`/api/user/${email}`)
            if (status === 200) {
                return data as User
            }
        }
        catch (e) {
            console.log(e)
        }
    }
)


export const { addCollectionToUser, deleteCollectionFromUser, editCollection, updateCollections, updateFlashcards } = userSlice.actions

export default userSlice.reducer