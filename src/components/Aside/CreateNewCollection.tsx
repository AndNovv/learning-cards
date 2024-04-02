import { ClipboardPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const CreateNewCollection = () => {

    const router = useRouter()

    return (
        <div onClick={() => router.push('/create')} className='flex flex-row justify-between items-center gap-2 px-2 py-4 w-full rounded-xl hover:bg-accent bg-background text-left cursor-pointer transition-all text-nowrap'>
            <p>Новая Коллекция</p>
            <ClipboardPlus size={20} />
        </div>
    )
}

export default CreateNewCollection