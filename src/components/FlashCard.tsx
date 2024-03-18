import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FlashCard } from '@/types/types'

const FlashCard = ({ flashcardInfo }: { flashcardInfo: FlashCard }) => {
    return (
        <Card className='flex-grow'>
            <CardHeader>
                <CardTitle>Флеш Карточка</CardTitle>
                <CardDescription>Описание</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{flashcardInfo.english}</p>
                <p>{flashcardInfo.russian}</p>
            </CardContent>
        </Card>

    )
}

export default FlashCard