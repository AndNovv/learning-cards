import { setVisibility } from '@/state/asideMenu/asideMenuSlice'
import { AppDispatch } from '@/state/store'
import { motion } from 'framer-motion'
import { ClipboardPlus } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import logo from '../../../public/images/logo.svg'
import { useToast } from '../ui/use-toast'

const CreateNewCollection = ({ isDesktop, disabled }: { isDesktop: boolean, disabled: boolean }) => {

    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const { toast } = useToast()

    const handleUserClick = () => {
        if (!isDesktop) {
            dispatch(setVisibility(false))
        }
        router.push('/create')
    }

    const [muskotAnimate, setMuskotAnimate] = useState(false)

    return (
        <div className='px-4'>
            <div onClick={disabled ? () => toast({ title: 'Войдите в аккаунт', description: 'Для сохранения прогресса вашего обучения требутеся авторизация!', variant: 'destructive' }) : handleUserClick} className='relative flex flex-row items-center gap-2 px-2 py-2 w-full rounded-xl hover:bg-asidehover bg-aside text-left cursor-pointer transition-all text-nowrap'>
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
                        src={logo}
                        alt={'logo'}
                        width={40}
                        height={40}
                    />
                </motion.div>
                <span className='flex-1'>Новая коллекция</span>
                <ClipboardPlus strokeWidth={1.2} size={20} />
            </div>
        </div>
    )
}

export default CreateNewCollection