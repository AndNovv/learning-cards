"use client"
import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useEffect, useState } from 'react'
import FillBlankExercise from '@/components/Lesson/FillBlankExercise'
import DefinitionExercise from '@/components/Lesson/DefinitionExercise'
import { LessonType } from '@/types/types'
import AudioPlayer from '@/components/Lesson/AudioPlayer'
import axios from 'axios'
import { audioFiles } from '@/audioFiles/audioFiles'

const LessonPage = ({ params }: { params: { lessonId: string } }) => {

    const [error, setError] = useState('')
    const [lessonData, setLessonData] = useState<LessonType | null>(null)

    useEffect(() => {

        const fetchData = async () => {

            try {
                const lessonResponse = await axios.get(`/api/lesson/${params.lessonId}`)
                if (lessonResponse.status === 200) {
                    setLessonData(lessonResponse.data)
                }
            } catch (e) {
                setError("Коллекция не найдена")
            }
        }

        fetchData()

    }, [])

    if (error) return <div className='paddings'>{error}</div>
    if (!lessonData) return <div className='paddings'>Загрузка...</div>

    return (
        <div className='relative flex flex-col gap-2 h-full w-full pt-6 md:pt-1 overflow-hidden'>
            <ScrollArea className='h-full'>
                <div className='flex paddings gap-5 flex-col pb-10 overflow-hidden'>

                    <div className='flex items-center gap-2 relative h-16'>
                        <h1 className='font-medium text-2xl w-2/3'>{lessonData.title}</h1>
                        <AudioPlayer src={audioFiles.get(lessonData.title)} />
                    </div>

                    <div className='flex flex-col'>
                        {lessonData.textParagraphs.map((paragraph, index) => {
                            return <p key={`paragraph-${index}`}>{paragraph}</p>
                        })}
                    </div>

                    {/* Раздел с новыми словами */}
                    <DefinitionExercise wordDefinitionsExercise={lessonData.wordDefinitionsExercise} />


                    {/* Fill in the blank Exercise */}
                    <FillBlankExercise fillBlankExercise={lessonData.fillBlankExercise} />


                </div>
            </ScrollArea >
        </div >
    )
}

export default LessonPage