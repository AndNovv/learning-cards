import React, { useState } from 'react'
import { AIPanelDataType, AnyFlashCard } from '@/types/types'
import ExistingCollectionWordPreview from './ExistingCollectionWordPreview'
import { motion } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import AiBottomPanel from './AiBottomPanel'
import useUserPreferences from '@/hooks/useUserPreferences'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/state/store'
import { useDispatch } from 'react-redux'
import { decrementFreeAssistances } from '@/state/user/userSlice'
import { promptBuilder } from '@/lib/collection/helpers'

const axios = require('axios')



const CollectionWords = ({ flashcards, bottomPadding }: { flashcards: AnyFlashCard[], bottomPadding: boolean }) => {


    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: RootState) => state.user)

    const { promptType, knowledgeLevel } = useUserPreferences()

    const [AiPanelData, setAiPanelData] = useState<AIPanelDataType>({ open: false, word: null, promptType: null, subscriptionRequired: !user.subscription && user.freeAssistances <= 0, data: null })

    const generateAIExamples = async (word: string) => {
        if (!user.subscription && user.freeAssistances <= 0) return

        try {
            const result = await axios.post('/api/openai', { prompt: promptBuilder(word, promptType, knowledgeLevel), userId: user._id })
            const paragraphs = result.data.split('\n')
            setAiPanelData({ open: true, word, promptType, subscriptionRequired: !user.subscription && user.freeAssistances <= 0, data: paragraphs })
            if (!user.subscription) dispatch(decrementFreeAssistances())
        }
        catch (e) {
            console.log(e)
        }

    }

    const handleAiButtonClick = (word: string) => {
        setAiPanelData({ open: true, word, promptType, subscriptionRequired: !user.subscription && user.freeAssistances <= 0, data: null })
        generateAIExamples(word)
    }


    return (
        <>
            <AiBottomPanel AiPanelData={AiPanelData} setAiPanelData={setAiPanelData} />
            <ScrollArea className='h-full paddings'>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        ease: "linear",
                        duration: 0.2,
                    }}
                    className={cn(bottomPadding ? 'pb-10' : 'pb-0', 'flex flex-col divide-y-2 overflow-hidden')}>
                    {flashcards.slice().reverse().map((flashcard, index) => {
                        return (
                            <ExistingCollectionWordPreview key={`flashcardPreview${index}`} flashcard={flashcard} handleAiButtonClick={handleAiButtonClick} />
                        )
                    })}
                </motion.div>
            </ScrollArea >
        </>
    )
}

export default CollectionWords