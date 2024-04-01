import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user/userSlice"
import newCollectionReducer from "./newCollection/newCollectionSlice"
import editedCollectionReducer from "./editedCollection/editedCollectionSlice"
import allFlashcardsReducer from "./allFlashcards/allFlashcardsSlice"

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            newCollection: newCollectionReducer,
            editedCollection: editedCollectionReducer,
            allFlashcards: allFlashcardsReducer,
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']