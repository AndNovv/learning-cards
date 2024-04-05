export type WordCollection = {
    _id: string
    title: string
    author: string
    flashcards: FlashCardType[]
    lastUpdateAt: Date
    publishedCollectionRef: string | null
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

export type PublishedCollectionType = {
    _id: string
    title: string
    authorId: string
    authorName: string
    flashcards: { english: string, russian: string }[]
    favouriteCount: number
    publishedAt: Date
    originCollection: string
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