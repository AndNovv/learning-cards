import { WordCollection, ClientWordCollection, FlashCardType, PublishedCollectionType } from "@/types/types"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { RootState } from "../store"

export interface User {
    _id: string
    name: string
    email: string
    subscription: boolean
    freeAssistances: number
    collections: WordCollection[]
    publishedCollections: PublishedCollectionType[]
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
        subscription: false,
        freeAssistances: 0,
        collections: [],
        publishedCollections: []
    },
    loading: true,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
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
        },
        changeCollectionName: (state, action: PayloadAction<{ collectionId: string, collectionName: string }>) => {
            const index = state.user.collections.findIndex((collection) => collection._id === action.payload.collectionId)
            state.user.collections[index].title = action.payload.collectionName
            changeCollectionNameDB(action.payload.collectionId, action.payload.collectionName)
        },
        deletePublishedCollection: (state, action: PayloadAction<string>) => {
            const index = state.user.publishedCollections.findIndex((collection) => collection._id === action.payload)
            if (index !== -1) {
                state.user.publishedCollections.splice(index, 1)
                deletePublishedCollectionDB(action.payload)
                const collectionIndex = state.user.collections.findIndex((collection) => collection.publishedCollectionRef === action.payload)
                if (collectionIndex !== -1) {
                    state.user.collections[collectionIndex].publishedCollectionRef = null
                }
            }
        },
        decrementFreeAssistances: (state) => {
            state.user.freeAssistances = state.user.freeAssistances - 1
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User | undefined>) => {
                if (action.payload) {
                    state.user = action.payload
                }
                else {
                    state.error = "Ошибка получения информации о пользователе"
                }
                state.loading = false
            })
            .addCase(createNewCollectionAndAddToUser.fulfilled, (state, action: PayloadAction<WordCollection | undefined>) => {
                if (action.payload) {
                    state.user.collections.push(action.payload)
                }
                else {
                    state.error = "Ошибка добавления Коллекции"
                }
            })
            .addCase(likePublishedCollection.fulfilled, (state, action: PayloadAction<WordCollection | undefined>) => {
                if (action.payload) {
                    state.user.collections.push(action.payload)
                }
                else {
                    state.error = "Ошибка добавления Коллекции"
                }
            })
            .addCase(dislikePublishedCollection.fulfilled, (state, action: PayloadAction<string | undefined>) => {
                if (action.payload) {
                    const index = state.user.collections.findIndex((element) => element._id === action.payload)
                    state.user.collections.splice(index, 1)
                }
                else {
                    state.error = "Ошибка удаления Коллекции"
                }
            })
            .addCase(publishCollection.fulfilled, (state, action: PayloadAction<{ collectionId: string, publishedCollection: PublishedCollectionType } | undefined>) => {
                const data = action.payload
                if (data) {
                    const index = state.user.collections.findIndex((collection) => collection._id === data.collectionId)
                    if (index !== -1) {
                        state.user.collections[index].publishedCollectionRef = data.publishedCollection._id
                        state.user.publishedCollections.push(data.publishedCollection)
                    }
                }
                else {
                    state.error = "Ошибка добавления Коллекции"
                }
            })
    }
})

const deletePublishedCollectionDB = async (collectionId: string) => {
    try {
        await axios.delete(`/api/publishedcollection/${collectionId}`)
    }
    catch (e) {
        console.log("Ошибка удаления коллекции")
    }
}

const changeCollectionNameDB = async (collectionId: string, collectionName: string) => {
    try {
        const request = { collectionName }
        await axios.patch(`/api/collection/${collectionId}/rename`, request)
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

export const dislikePublishedCollection = createAsyncThunk(
    'user/dislikePublishedCollection',
    async ({ userId, collectionId }: { userId: string, collectionId: string }) => {
        try {
            const request = { userId }
            const { data }: { data: WordCollection } = await axios.post(`/api/publishedcollection/${collectionId}/dislike`, request)
            await deleteCollectionFromUserDB(userId, data._id)
            return data._id
        }
        catch (e) {
            console.log(e)
        }
    }
)

export const likePublishedCollection = createAsyncThunk(
    'user/likePublishedCollection',
    async ({ userId, collectionId }: { userId: string, collectionId: string }) => {
        try {
            const request = { userId }
            const { data, status } = await axios.post(`/api/publishedcollection/${collectionId}/like`, request)
            if (status !== 200) console.log('error')
            return data as WordCollection
        }
        catch (e) {
            console.log(e)
        }
    }
)

export const publishCollection = createAsyncThunk(
    'user/publishCollection',
    async (collectionId: string, { getState }) => {
        try {
            const { user } = getState() as RootState
            const request = { userId: user.user._id }
            const { data }: { data: PublishedCollectionType } = await axios.post(`/api/collection/${collectionId}/publish`, request)

            return { collectionId, publishedCollection: data }
        }
        catch (e) {
            console.log(e)
        }
    }
)

export const createNewCollectionAndAddToUser = createAsyncThunk(
    'user/createNewCollectionAndAddToUser',
    async ({ collection }: { collection: ClientWordCollection }) => {
        try {
            const request = collection
            const { data, status } = await axios.post(`/api/collection`, request)

            if (status !== 200) {
                throw new Error(`Error ${status}`);
            }

            return data as WordCollection
        }
        catch (e) {
            console.log(e)
        }
    }
)

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () => {
        try {
            const { data, status } = await axios(`/api/user`)
            if (status === 200) {
                return data as User
            }
        }
        catch (e) {
            console.log(e)
        }
    }
)


export const { deleteCollectionFromUser, editCollection, updateCollections, updateFlashcards, changeCollectionName, deletePublishedCollection, decrementFreeAssistances } = userSlice.actions

export default userSlice.reducer