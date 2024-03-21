
export type FlashCardType = {
    english: string
    russian: string
}

export type WordCollection = {
    _id: string
    title: string
    author: string
    flashcards: FlashCardType[]
}
