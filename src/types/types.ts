
export type FlashCardType = {
    english: string
    russian: string
}

export type WordCollection = {
    id: number
    title: string
    author: string
    flashcards: FlashCardType[]
}
