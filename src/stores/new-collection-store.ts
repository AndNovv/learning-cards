import { FlashCardType } from '@/types/types'
import { create } from 'zustand'

export type NewCollectionState = {
    title: string | undefined,
    author: string | undefined,
    flashcards: FlashCardType[]
}

export const useNewCollectionStore = create<NewCollectionState>()(() => ({
    title: undefined,
    author: 'user',
    flashcards: [],
}))

export const addFlashCardToNewCollection = (flashcard: FlashCardType) => {
    useNewCollectionStore.setState((state) => {
        return {
            ...state,
            flashcards: [...state.flashcards, flashcard]
        }
    })
}

export const deleteFlashCardFromNewCollection = (flashCardIndex: number) => {
    useNewCollectionStore.setState((state) => {
        const newFlashcards: FlashCardType[] = [...state.flashcards]
        newFlashcards.splice(flashCardIndex, 1)
        return {
            ...state,
            flashcards: newFlashcards
        }
    })
}

export const editFlashCardFromNewCollection = (flashCardIndex: number, flashcard: FlashCardType) => {
    useNewCollectionStore.setState((state) => {
        const newFlashcards: FlashCardType[] = [...state.flashcards]
        newFlashcards[flashCardIndex] = flashcard
        return {
            ...state,
            flashcards: newFlashcards
        }
    })
}

export const resetNewCollection = () => {
    useNewCollectionStore.setState(() => {
        return {
            author: 'user',
            title: undefined,
            flashcards: [],
        }
    })
}