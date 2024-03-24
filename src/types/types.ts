
export type FlashCardType = {
    _id: string
    english: string
    russian: string
}

export type FlashCardClientType = {
    english: string
    russian: string
}

export type WordCollection = {
    _id: string
    title: string
    author: string
    flashcards: FlashCardType[]
}

export type WordCollectionClient = {
    title: string
    author: string
    flashcards: FlashCardClientType[]
}
