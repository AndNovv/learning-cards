export type WordCollection = {
    _id: string
    title: string
    author: string
    flashcards: FlashCardType[]
    lastUpdateAt: Date
}

export type FlashCardType = {
    _id: string
    english: string
    russian: string
    repetition: number
    EF: number
    interval: number
    repetitionTime: number
}


export type ClientWordCollection = {
    title: string
    author: string
    flashcards: ClientFlashCardType[]
}

export type ClientFlashCardType = {
    _id: string
    english: string
    russian: string
}