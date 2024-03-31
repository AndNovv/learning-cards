import { FlashCardType } from "@/types/types"

export const RecalculateFlashcard = (flashcard: FlashCardType, isRemembered: boolean) => {

    const day = 1000 * 60 * 60 * 24

    const recalculatedFlashcard = { ...flashcard }

    if (isRemembered) {
        if (recalculatedFlashcard.repetition === 0) {
            recalculatedFlashcard.interval = 1
        }
        else if (recalculatedFlashcard.repetition === 1) {
            recalculatedFlashcard.interval = 6
        }
        else {
            recalculatedFlashcard.interval = Math.round(recalculatedFlashcard.interval * recalculatedFlashcard.EF)
        }
        recalculatedFlashcard.repetition += 1
        recalculatedFlashcard.EF += 0.1
    }
    else {
        recalculatedFlashcard.repetition = 0
        recalculatedFlashcard.interval = 1
        recalculatedFlashcard.EF -= 0.5
    }
    console.log(recalculatedFlashcard)

    recalculatedFlashcard.repetitionTime = Date.now() + day * recalculatedFlashcard.interval

    console.log(recalculatedFlashcard)
    if (recalculatedFlashcard.EF < 1.3) recalculatedFlashcard.EF = 1.3

    return recalculatedFlashcard
}
