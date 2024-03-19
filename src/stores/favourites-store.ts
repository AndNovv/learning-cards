import { create } from 'zustand'

export type FavouriteCollectionState = {
  favouriteCollections: number[]
}

export const useFavouriteCollectionsStore = create<FavouriteCollectionState>()(() => ({
  favouriteCollections: [],
}))

export const addFavouriteCollection = (collectionId: number) => {
  useFavouriteCollectionsStore.setState((state) => {
    return { favouriteCollections: [...state.favouriteCollections, collectionId] }
  })
}

export const deleteFavouriteCollection = (collectionId: number) => {
  useFavouriteCollectionsStore.setState((state) => {
    const newFavourites: number[] = [...state.favouriteCollections]
    const index = newFavourites.indexOf(collectionId);
    if (index > -1) {
      newFavourites.splice(index, 1)
    }
    return { favouriteCollections: newFavourites }
  })
}
