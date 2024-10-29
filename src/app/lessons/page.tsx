"use client"
import LessonPreviewCard from '@/components/Lesson/LessonPreviewCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LessonPreviewType } from '@/types/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


const LessonsPage = () => {

    const [lessons, setLessons] = useState<LessonPreviewType[]>([])
    const [error, setError] = useState('')

    useEffect(() => {

        const fetchData = async () => {

            try {
                const lessonsResponse = await axios.get(`/api/lessons`)
                if (lessonsResponse.status === 200) {
                    setLessons(lessonsResponse.data)
                }
            } catch (e) {
                setError("Ошибка")
            }
        }

        fetchData()

    }, [])

    if (error) return <div className='paddings'>Ошибка</div>
    if (lessons.length === 0) return <div className='paddings'>Загрузка...</div>

    return (
        <div className='flex w-full flex-col gap-6 pt-6 md:pt-0 flex-1 overflow-hidden'>

            <ScrollArea className='h-full'>
                <div className='grid grid-cols-1 paddings lg:grid-cols-2 gap-6 pb-6'>
                    {lessons.map((lesson) => {
                        return (
                            <LessonPreviewCard key={`lesson-${lesson._id}`} lesson={lesson} />
                        )
                    })}
                </div>
            </ScrollArea >
        </div>
    )
}

export default LessonsPage