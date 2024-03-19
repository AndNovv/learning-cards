import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { EllipsisVertical, Trash } from "lucide-react"
import { FlashCard } from "@/types/types"
import { deleteFlashCardFromNewCollection, editFlashCardFromNewCollection } from "@/stores/new-collection-store"

const SingleCardPreview = ({ flashcard, flashCardIndex, isDesktop }: { flashcard: FlashCard, flashCardIndex: number, isDesktop: boolean }) => {
    const [open, setOpen] = React.useState(false)

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className='flex flex-row hover:bg-secondary cursor-pointer px-4 py-3 justify-between gap-4'>
                        <div className='flex flex-row gap-2 w-full'>
                            <p>{flashcard.english}</p>
                            <p>-</p>
                            <p>{flashcard.russian}</p>
                        </div>
                        <EllipsisVertical />
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Редактирование карточки</DialogTitle>
                        <DialogDescription>
                            Внесите нужные изменения
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col mt-2">
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col gap-2">
                                <p>Английский</p>
                                <Input placeholder="Английский" defaultValue={flashcard.english}></Input>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p>Русский</p>
                                <Input placeholder="Русский" defaultValue={flashcard.russian}></Input>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between mt-6">
                            <Button variant={'outline'} onClick={() => {
                                setOpen(false)
                                editFlashCardFromNewCollection(flashCardIndex, { english: 'asd', russian: 'sla' })
                            }}>
                                Сохранить
                            </Button>
                            <Button variant={'destructive'} size={'smallIcon'} onClick={() => {
                                setOpen(false)
                                deleteFlashCardFromNewCollection(flashCardIndex)
                            }}>
                                <Trash className="scale-90" />
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <div className='flex flex-row hover:bg-secondary cursor-pointer px-4 py-3 justify-between gap-4'>
                    <div className='flex flex-row gap-2 w-full'>
                        <p>{flashcard.english}</p>
                        <p>-</p>
                        <p>{flashcard.russian}</p>
                    </div>
                    <EllipsisVertical />
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Редактирование карточки</DrawerTitle>
                    <DrawerDescription>
                        Внесите нужные изменения
                    </DrawerDescription>
                    <div className="flex flex-col mt-4">
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col gap-2 flex-1">
                                <p>Английский</p>
                                <Input placeholder="Английский" defaultValue={flashcard.english}></Input>
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <p>Русский</p>
                                <Input placeholder="Русский" defaultValue={flashcard.russian}></Input>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between mt-6">
                            <DrawerClose>
                                <Button variant={'outline'} onClick={() => { editFlashCardFromNewCollection(flashCardIndex, { english: 'asd', russian: 'sla' }) }}>
                                    Сохранить
                                </Button>
                            </DrawerClose>
                            <DrawerClose>
                                <Button variant={'destructive'} size={'smallIcon'} onClick={() => { deleteFlashCardFromNewCollection(flashCardIndex) }}>
                                    <Trash className="scale-90" />
                                </Button>
                            </DrawerClose>
                        </div>
                    </div>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}

export default SingleCardPreview 