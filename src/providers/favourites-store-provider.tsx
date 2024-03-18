'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import { type FavouritesStore, createFavouritesStore } from '@/stores/favourites-store'

export const FavouritesStoreContext = createContext<StoreApi<FavouritesStore> | null>(
    null,
)

export interface FavouritesStoreProviderProps {
    children: ReactNode
}

export const FavouritesStoreProvider = ({
    children,
}: FavouritesStoreProviderProps) => {
    const storeRef = useRef<StoreApi<FavouritesStore>>()
    if (!storeRef.current) {
        storeRef.current = createFavouritesStore()
    }

    return (
        <FavouritesStoreContext.Provider value={storeRef.current}>
            {children}
        </FavouritesStoreContext.Provider>
    )
}

export const useFavouritesStore = <T,>(
    selector: (store: FavouritesStore) => T,
): T => {
    const favouritesStoreContext = useContext(FavouritesStoreContext)

    if (!favouritesStoreContext) {
        throw new Error(`useFavouritesStore must be use within FavouritesStoreProvider`)
    }

    return useStore(favouritesStoreContext, selector)
}