import { RootState } from "@/state/store"
import { FlashCardType } from "@/types/types"
import { useMemo } from "react"
import { useSelector } from "react-redux"

const useAllFlashcards = () => {


    const { user } = useSelector((state: RootState) => state.user)

    const flashcards = useMemo(() => {

        console.log('Calculating optimal learning strategy...')

        let allFlashcards: FlashCardType[] = [];

        user.collections.forEach((collection) => {
            allFlashcards = [...allFlashcards, ...collection.flashcards];
        });

        allFlashcards.sort((a, b) => a.repetitionTime - b.repetitionTime)

        return allFlashcards;
    }, [user.collections]);

    return flashcards;
}

export default useAllFlashcards