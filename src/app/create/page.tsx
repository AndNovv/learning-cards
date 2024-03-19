import CollectionWordsPreview from '@/components/CreateCollection/CollectionWordsPreview'
import NewWordCardInput from '@/components/CreateCollection/NewWordCardInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const CreateCollectionPage = () => {
    return (
        <div className='flex flex-col gap-8 xl:px-60 lg:px-40 md:px-20 px-1'>
            <div className='flex flex-row gap-4'>
                <Input placeholder='Введите название Коллекции' />
                <Button variant={'outline'}>Создать</Button>
            </div>
            <NewWordCardInput />
            <CollectionWordsPreview />
        </div>
    )
}

export default CreateCollectionPage