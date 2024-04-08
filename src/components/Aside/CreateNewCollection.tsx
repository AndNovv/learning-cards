import { setVisibility } from '@/state/asideMenu/asideMenuSlice'
import { AppDispatch } from '@/state/store'
import { motion } from 'framer-motion'
import { ClipboardPlus } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
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

    const [muskotAnimate, setMuskotAnimate] = useState(false)

    return (
        <div onClick={handleUserClick} className='relative flex flex-row items-center gap-2 px-2 py-2 w-full rounded-xl hover:bg-hover bg-background text-left cursor-pointer transition-all text-nowrap'>
            <motion.div
                initial={"initial"}
                animate={muskotAnimate ? 'rotated' : 'initial'}
                variants={{
                    initial: { rotate: 0 },
                    rotated: { rotate: 360 },
                }}
                onMouseEnter={e => setMuskotAnimate((prev) => !prev)}
                transition={{ type: "spring", stiffness: 100, duration: 1 }}
            >
                <Image
                    src={'/images/muskot-logo.svg'}
                    alt={'muskot-logo'}
                    width={40}
                    height={40}
                />
            </motion.div>
            <p className='flex-1 font-medium'>Новая Коллекция</p>
            <ClipboardPlus size={20} />
        </div>
    )
}

export default CreateNewCollection