import { createStore } from 'zustand/vanilla'

export type FavouritesState = {
  favourites: Set<number>
}

export type FavouritesActions = {
  addFavourite: (collectionId: number) => void
  deleteFavourite: (collectionId: number) => void
}

export type FavouritesStore = FavouritesState & FavouritesActions

export const defaultFavouritesState: FavouritesState = {
  favourites: new Set([]),
}

// Create your store, which includes both state and (optionally) actions
export const createFavouritesStore = (
  initFavouritesState: FavouritesState = defaultFavouritesState,
) => {
  return createStore<FavouritesState & FavouritesActions>((set) => ({
    ...initFavouritesState,
    addFavourite: (collectionId) => set((prev) => {
      const newFavourites: Set<number> = new Set(prev.favourites)
      newFavourites.add(collectionId)
      return { favourites: newFavourites }
    }),
    deleteFavourite: (collectionId) => set((prev) => {
      const newFavourites: Set<number> = new Set(prev.favourites)
      newFavourites.delete(collectionId)
      return { favourites: newFavourites }
    })
  }))
}
