export type WordCollection = {
    _id: string
    title: string
    author: string
    authorId: string
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
    authorId: string
    flashcards: ClientFlashCardType[]
}

export type ClientFlashCardType = {
    _id: string
    english: string
    russian: string
}

export type AnyFlashCard = {
    english: string;
    russian: string;
    [key: string]: any; // Additional properties of any type
}

export type PromptType = 'examples' | 'definition'

export type DifficultyType = 'beginner' | 'intermediate' | 'advanced'

export type AIPanelDataType = {
    open: boolean
    word: string
    promptType: PromptType
    subscriptionRequired: boolean
    data: string[] | null
} | {
    open: false
    word: null
    promptType: null
    subscriptionRequired: boolean
    data: null
}
