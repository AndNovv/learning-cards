import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import useMediaQuery from '@/hooks/useMediaQuery'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { ThreeDots } from 'react-loader-spinner'
import { AIPanelDataType } from '@/types/types'
import { motion } from 'framer-motion'

const AiBottomPanel = ({ AiPanelData, setAiPanelData }: { AiPanelData: AIPanelDataType, setAiPanelData: React.Dispatch<React.SetStateAction<AIPanelDataType>> }) => {

    const isDesktop = useMediaQuery("(min-width: 768px)")

    const setOpen = () => {
        if (AiPanelData.open) setAiPanelData((prev) => ({ ...prev, open: false }))
    }

    if (isDesktop) {
        return (
            <Sheet open={AiPanelData.open} onOpenChange={setOpen}>
                <SheetContent side={"bottom"} className="px-10 md:px-20 lg:px-40 xl:px-60 2xl:px-80 min-h-80 text-balance flex">
                    <SheetHeader className='flex gap-1 flex-col text-left flex-1'>
                        <SheetTitle className="mb-2">
                            {AiPanelData.subscriptionRequired ? <SubscriptionRequiredTitle /> : <PanelTitle AiPanelData={AiPanelData} />}
                        </SheetTitle>
                        {AiPanelData.subscriptionRequired ? <SubscriptionRequiredContent /> : <PanelContent data={AiPanelData.data ? AiPanelData.data : null} />}
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        )
    }
    return (
        <Drawer open={AiPanelData.open} onClose={setOpen}>
            <DrawerContent className="min-h-80 text-left text-balance">
                <DrawerHeader className='flex gap-1 flex-col text-left flex-1'>
                    <DrawerTitle className='mb-2'>
                        {AiPanelData.subscriptionRequired ? <SubscriptionRequiredTitle /> : <PanelTitle AiPanelData={AiPanelData} />}
                    </DrawerTitle>
                    {AiPanelData.subscriptionRequired ? <SubscriptionRequiredContent /> : <PanelContent data={AiPanelData.data ? AiPanelData.data : null} />}
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}

const PanelContent = ({ data }: { data: string[] | null }) => {

    return (
        <div className='flex flex-1 relative'>
            {data ?
                <motion.div
                    className='space-y-1'
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.01 }}
                    aria-hidden
                >
                    {data.map((line, index) => (
                        <span key={`line${index}`} className='block text-wrap' >
                            {line.split(" ").map((word, index) => (
                                <span key={`word${index}`} className='inline-block'>
                                    {word.split("").map((char, index) => (
                                        <motion.span
                                            key={`char${index}`}
                                            variants={{
                                                hidden: { opacity: 0 },
                                                visible: { opacity: 1 }
                                            }}>
                                            {char}
                                        </motion.span>
                                    ))}
                                    <span className="inline-block">&nbsp;</span>
                                </span>
                            ))}

                        </span>
                    ))}

                </motion.div> :
                <div className='flex flex-1 w-full justify-center items-center'>
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#4076c6"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            }


        </div>

    )
}

const PanelTitle = ({ AiPanelData }: { AiPanelData: AIPanelDataType }) => {
    return (
        <div className="flex flex-row justify-between items-center leading-6">
            <h2>
                {AiPanelData.promptType === 'examples' ?
                    `Примеры предложений с ${AiPanelData.word}:` :
                    `Определение ${AiPanelData.word}:`}
            </h2>
            <Popover>
                <PopoverTrigger asChild>
                    <Button className='rounded-full' variant="outline">?</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className='p-2'>
                        Вы можете настроить ассистента Плекси на странице своего профиля.
                    </div>
                </PopoverContent>
            </Popover>

        </div>
    )
}

const SubscriptionRequiredTitle = () => {
    return (
        <div className='leading-6'>У вас закончились бесплатные подсказки ассистента Плекси</div>
    )
}

const SubscriptionRequiredContent = () => {
    return (
        <div className="flex flex-col gap-4">
            <h2>Оформите ежемесячную подписку и пользуйтесь подсказками без ограничений!</h2>
            <Card className='p-4 w-fit self-center'>
                <CardTitle className='mb-1'>Подписки скоро будут доступны</CardTitle>
                <CardDescription>Отличный способ поддержать проект</CardDescription>
                <CardContent className='p-0 pt-2'>
                    <h3 className='font-medium mb-1'>Что дает подписка:</h3>
                    <p>- Помощь ассистента доступна 24/7</p>
                    <p>- Поддержка дальнейшего улучшения платформы</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default AiBottomPanel