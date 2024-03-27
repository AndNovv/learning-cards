import FlashCard from '@/components/Learning/FlashCard'
import ForgetButton from '@/components/Learning/ForgetButton'
import RememberButton from '@/components/Learning/RememberButton'
import React from 'react'

const Learning = () => {

    return (
        <div className='flex flex-col gap-10 justify-center items-center h-full'>
            <FlashCard flashcardInfo={{ _id: '', english: 'english', russian: 'russian' }} />
            <div className='flex flex-row w-1/2 justify-between'>
                {/* <ForgetButton />
                <RememberButton /> */}
            </div>
        </div>
    )
}

export default Learning