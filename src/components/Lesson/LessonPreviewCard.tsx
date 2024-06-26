import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { LessonPreviewType } from '@/types/types'


const LessonPreviewCard = ({ lesson }: { lesson: LessonPreviewType }) => {

    const router = useRouter()

    return (
        <Card className='w-full flex flex-col shadow-xl cursor-pointer' onClick={() => router.push(`/lesson/${lesson._id}`)}>
            <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
                <CardDescription>
                    {lesson.level}
                </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col justify-between flex-1 gap-8'>
                {lesson.description}
            </CardContent>
        </Card>
    )
}

export default LessonPreviewCard