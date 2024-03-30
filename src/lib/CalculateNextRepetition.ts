import { FlashCardType } from "@/types/types"

export const CalculateNextRepetition = (flashCard: FlashCardType, isRemembered: boolean) => {

    const day = 1000 * 60 * 60 * 24

    if (isRemembered) {
        if (flashCard.repetition === 0) {
            flashCard.interval = 1
        }
        else if (flashCard.repetition === 1) {
            flashCard.interval = 6
        }
        else {
            flashCard.interval = Math.round(flashCard.interval * flashCard.EF)
        }
        flashCard.repetition += 1
        flashCard.EF += 0.1
    }
    else {
        flashCard.repetition = 0
        flashCard.interval = 1
        flashCard.EF -= 0.5
    }

    flashCard.repetitionTime = Date.now() + day * flashCard.interval

    if (flashCard.EF < 1.3) flashCard.EF = 1.3
}
