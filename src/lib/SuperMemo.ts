type NewFlashCardType = {
    english: string
    russian: string
    repetition: number
    EF: number
    interval: number
}


export const SuperMemo = (flashCard: NewFlashCardType, isRemembered: boolean) => {

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

    if (flashCard.EF < 1.3) flashCard.EF = 1.3
}
