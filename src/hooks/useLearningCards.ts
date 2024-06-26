import { RecalculateFlashcard } from "@/lib/RecalculateFlashcard"
import { addUpdatedCard, applyUpdatedCards } from "@/state/allFlashcards/allFlashcardsSlice"
import { AppDispatch, RootState } from "@/state/store"
import { FlashCardType } from "@/types/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"


type useLearningCardsReturnType = {
    flashcards: FlashCardType[],
    addNewUpdatedCard: (isRemembered: boolean) => void,
    flashcardsLoading: false
} | {
    flashcards: null,
    addNewUpdatedCard: null,
    flashcardsLoading: true
}

const useLearningCards = () => {

    const router = useRouter()

    const { flashcards } = useSelector((state: RootState) => state.allFlashcards)
    const dispatch = useDispatch<AppDispatch>()

    const [flashcardIndex, setFlashcardIndex] = useState(0)

    useEffect(() => {
        return () => {
            dispatch(applyUpdatedCards())
        }
    }, [])

    if (!flashcards) return { flashcards: null, addNewUpdatedCard: null, flashcardsLoading: true } as useLearningCardsReturnType

    const currentFlashcard = flashcards[flashcardIndex]

    const addNewUpdatedCard = (isRemembered: boolean) => {
        if (flashcardIndex !== flashcards.length - 1) {
            const recalculatedFlashcard = RecalculateFlashcard(currentFlashcard, isRemembered)
            dispatch(addUpdatedCard(recalculatedFlashcard))
            setFlashcardIndex((prev) => prev + 1)
        }
        else if (flashcardIndex === flashcards.length - 1) {
            const recalculatedFlashcard = RecalculateFlashcard(currentFlashcard, isRemembered)
            dispatch(addUpdatedCard(recalculatedFlashcard))
            setFlashcardIndex((prev) => prev + 1)
            router.push('/finishedlearning')
        }
    }


    return { flashcards, addNewUpdatedCard, flashcardsLoading: false } as useLearningCardsReturnType
}

export default useLearningCards