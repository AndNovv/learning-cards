import { setVisibility } from '@/state/asideMenu/asideMenuSlice'
import { AppDispatch } from '@/state/store'
import { ClipboardPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'

const CreateNewCollection = ({ isDesktop }: { isDesktop: boolean }) => {

    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const handleUserClick = () => {
        if (!isDesktop) {
            dispatch(setVisibility(false))
        }
        router.push('/create')
    }

    return (
        <div onClick={handleUserClick} className='relative flex flex-row justify-between items-center gap-2 px-2 py-4 w-full rounded-xl hover:bg-hover bg-background text-left cursor-pointer transition-all text-nowrap'>
            <p>Новая Коллекция</p>
            <ClipboardPlus size={20} />
        </div>
    )
}

export default CreateNewCollection