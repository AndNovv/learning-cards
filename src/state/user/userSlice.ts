import { WordCollection, WordCollectionClient } from "@/types/types"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface User {
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
        const response = await fetch('http://localhost:3000/api/user/collection', {
            cache: "no-store",
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(request)
        })
        if (!response.ok) {
            console.log("Ошибка добавления коллекции")
        }
    }
    catch (e) {
        console.log("Ошибка добавления коллекции")
    }
}

const deleteCollectionFromUserDB = async (userId: string, collectionId: string) => {
    try {
        const request = { userId, collectionId }
        const response = await fetch('http://localhost:3000/api/user/collection', {
            cache: "no-store",
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(request)
        })
        if (!response.ok) {
            console.log("Ошибка добавления коллекции")
        }
    }
    catch (e) {
        console.log("Ошибка добавления коллекции")
    }
}


export const createNewCollectionAndAddToUser = createAsyncThunk(
    'user/createNewCollectionAndAddToUser',
    async ({ userId, collection }: { userId: string, collection: WordCollectionClient }) => {
        try {
            const request = { title: collection.title, author: collection.author, flashcards: collection.flashcards.map((flashcard) => ({ english: flashcard.english, russian: flashcard.russian })) }
            const response = await fetch('http://localhost:3000/api/collection', {
                cache: "no-store",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(request)
            })
            if (response.ok) {
                const newCollection = await response.json()
                await addCollectionToUserDB(userId, newCollection._id)
                return newCollection as WordCollection
            }
            else {
                console.log("Ошибка добавления новой коллекции")
            }
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
            const response = await fetch(`http://localhost:3000/api/user/${email}`, { cache: "no-store" })
            if (response.ok) {
                const user = await response.json()
                return user
            }
            else {
                console.log("Ошибка получения данных о пользователе")
            }
        }
        catch (e) {
            console.log(e)
        }
    }
)


export const { addCollectionToUser, deleteCollectionFromUser, editCollection } = userSlice.actions

export default userSlice.reducer