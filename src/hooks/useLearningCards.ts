import { RecalculateFlashcard } from "@/lib/RecalculateFlashcard"
import { addUpdatedCard, applyUpdatedCards } from "@/state/allFlashcards/allFlashcardsSlice"
import { AppDispatch, RootState } from "@/state/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

const useLearningCards = () => {

    const router = useRouter()

    const { flashcards, updatedCards } = useSelector((state: RootState) => state.allFlashcards)
    const dispatch = useDispatch<AppDispatch>()

    const [flashcardIndex, setFlashcardIndex] = useState(0)
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
            router.push('/')
        }
    }

    useEffect(() => {
        return () => {
            dispatch(applyUpdatedCards())
        }
    }, [])

    return { currentFlashcard, addNewUpdatedCard }
}

export default useLearningCards