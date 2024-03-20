import { allCollections } from '@/data/data'
import { WordCollection } from '@/types/types'
import { create } from 'zustand'

export type FavouriteCollectionsState = {
  favouriteCollections: WordCollection[]
}

export const useFavouriteCollectionsStore = create<FavouriteCollectionsState>()(() => ({
  favouriteCollections: [],
}))

export const addFavouriteCollection = (collection: WordCollection) => {
  useFavouriteCollectionsStore.setState((state) => {
    return { favouriteCollections: [...state.favouriteCollections, collection] }
  })
}

export const deleteFavouriteCollection = (collectionId: number) => {
  useFavouriteCollectionsStore.setState((state) => {
    const newFavouriteCollections = [...state.favouriteCollections].filter((item) => item.id !== collectionId)
    return { favouriteCollections: newFavouriteCollections }
  })
}
