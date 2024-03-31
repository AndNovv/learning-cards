import { AppDispatch, RootState } from "@/state/store"
import { updateFlashcards } from "@/state/user/userSlice"
import { FlashCardType } from "@/types/types"
import { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

const useAllFlashcards = () => {

    const dispatch = useDispatch<AppDispatch>()

    const { user } = useSelector((state: RootState) => state.user)

    const [updatedCards, setUpdatedCards] = useState<FlashCardType[]>([])

    const flashcards = useMemo(() => {

        console.log('Calculating optimal learning strategy...')

        let allFlashcards: FlashCardType[] = [];

        user.collections.forEach((collection) => {
            allFlashcards = [...allFlashcards, ...collection.flashcards];
        });

        allFlashcards.sort((a, b) => a.repetitionTime - b.repetitionTime)

        return allFlashcards;
    }, []);

    useEffect(() => {
        if (updatedCards.length === flashcards.length) {
            dispatch(updateFlashcards(updatedCards))
        }
    }, [updatedCards, flashcards, dispatch])

    const addUpdatedCard = (flashcard: FlashCardType) => {
        setUpdatedCards((prev) => [...prev, flashcard])
    }

    return { flashcards, addUpdatedCard };
}

export default useAllFlashcards