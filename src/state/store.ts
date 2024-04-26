import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user/userSlice"
import newCollectionReducer from "./newCollection/newCollectionSlice"
import editedCollectionReducer from "./editedCollection/editedCollectionSlice"
import allFlashcardsReducer from "./allFlashcards/allFlashcardsSlice"
import activeCollectionReducer from "./activeCollection/activeCollectionSlice"
import asideMenuReducer from "./asideMenu/asideMenuSlice"
import currentPracticeCollectionReducer from "./currentPracticeCollection/currentPracticeCollectionSlice"

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            newCollection: newCollectionReducer,
            editedCollection: editedCollectionReducer,
            allFlashcards: allFlashcardsReducer,
            activeCollection: activeCollectionReducer,
            asideMenu: asideMenuReducer,
            currentPracticeCollection: currentPracticeCollectionReducer
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']