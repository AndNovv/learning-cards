import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'



const LessonPreviewCard = ({ _id, title }: { title: string, _id: string }) => {

    const router = useRouter()

    return (
        <Card className='w-full flex flex-col shadow-xl cursor-pointer' onClick={() => router.push(`/lesson/${_id}`)}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>Описание</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col justify-between flex-1 gap-8'>
                Контент
            </CardContent>
        </Card>
    )
}

export default LessonPreviewCard