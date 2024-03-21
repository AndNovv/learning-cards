import { FlashCardType, WordCollection } from '@/types/types'
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

export const deleteFavouriteCollection = (collectionId: string) => {
  useFavouriteCollectionsStore.setState((state) => {
    const newFavouriteCollections = [...state.favouriteCollections].filter((item) => item._id !== collectionId)
    return { favouriteCollections: newFavouriteCollections }
  })
}


// Collection
export const addFlashCardToCollection = (collectionId: string, flashcard: FlashCardType) => {
  useFavouriteCollectionsStore.setState((state) => {
    const newFavouriteCollections = [...state.favouriteCollections]
    for (let i = 0; i < newFavouriteCollections.length; i++) {
      if (newFavouriteCollections[i]._id === collectionId) {
        const newFlashcards = newFavouriteCollections[i].flashcards
        newFlashcards.push(flashcard)
        newFavouriteCollections[i] = { ...newFavouriteCollections[i], flashcards: newFlashcards }
      }
    }
    return {
      favouriteCollections: [...state.favouriteCollections,]
    }
  })
}

export const deleteFlashCardFromCollection = (collectionId: string, flashcardIndex: number) => {
  useFavouriteCollectionsStore.setState((state) => {
    const newFavouriteCollections = [...state.favouriteCollections]
    for (let i = 0; i < newFavouriteCollections.length; i++) {
      if (newFavouriteCollections[i]._id === collectionId) {
        const newFlashcards = newFavouriteCollections[i].flashcards
        newFlashcards.splice(flashcardIndex, 1)
        newFavouriteCollections[i] = { ...newFavouriteCollections[i], flashcards: newFlashcards }
      }
    }
    return {
      favouriteCollections: [...state.favouriteCollections,]
    }
  })
}

export const editFlashCardFromCollection = (collectionId: string, flashcardIndex: number, flashcard: FlashCardType) => {
  useFavouriteCollectionsStore.setState((state) => {
    const newFavouriteCollections = [...state.favouriteCollections]
    for (let i = 0; i < newFavouriteCollections.length; i++) {
      if (newFavouriteCollections[i]._id === collectionId) {
        const newFlashcards = newFavouriteCollections[i].flashcards
        newFlashcards[flashcardIndex] = flashcard
        newFavouriteCollections[i] = { ...newFavouriteCollections[i], flashcards: newFlashcards }
      }
    }
    return {
      favouriteCollections: [...state.favouriteCollections,]
    }
  })
}
