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
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { EllipsisVertical, Trash } from "lucide-react"
import { FlashCardType } from "@/types/types"
import { deleteFlashCardFromNewCollection, editFlashCardFromNewCollection } from "@/stores/new-collection-store"
import { useRef } from "react"
import { deleteFlashCardFromCollection, editFlashCardFromCollection } from "@/stores/favourites-store"

const ExistingCollectionWordPreview = ({ collectionId, flashcard, flashCardIndex, isDesktop }: { collectionId: number, flashcard: FlashCardType, flashCardIndex: number, isDesktop: boolean }) => {
    const [open, setOpen] = React.useState(false)

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className='flex flex-row hover:bg-secondary transition-all cursor-pointer px-4 py-3 justify-between gap-4'>
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
                    <ModalWindowDialog collectionId={collectionId} setOpen={setOpen} flashcard={flashcard} flashCardIndex={flashCardIndex} />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <div className='flex flex-row hover:bg-secondary transition-all cursor-pointer px-4 py-3 justify-between gap-4'>
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
                    <ModalWindowDialog collectionId={collectionId} setOpen={setOpen} flashcard={flashcard} flashCardIndex={flashCardIndex} />
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}

const ModalWindowDialog = ({ collectionId, setOpen, flashcard, flashCardIndex }: { collectionId: number, setOpen: React.Dispatch<React.SetStateAction<boolean>>, flashcard: FlashCardType, flashCardIndex: number }) => {


    const englishModalInputRef = useRef<HTMLInputElement>(null)
    const russianModalInputRef = useRef<HTMLInputElement>(null)

    return (
        <form
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault()
                setOpen(false)
                if (englishModalInputRef.current?.value && russianModalInputRef.current?.value) {
                    editFlashCardFromCollection(collectionId, flashCardIndex, { english: englishModalInputRef.current.value, russian: russianModalInputRef.current.value })
                }
            }}
            onReset={(e: React.FormEvent) => {
                e.preventDefault()
                setOpen(false)
                deleteFlashCardFromCollection(collectionId, flashCardIndex)
            }}
            className="flex flex-col mt-2"
        >
            <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-2 flex-1">
                    <p>Английский</p>
                    <Input ref={englishModalInputRef} placeholder="Английский" defaultValue={flashcard.english}></Input>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <p>Русский</p>
                    <Input ref={russianModalInputRef} placeholder="Русский" defaultValue={flashcard.russian}></Input>
                </div>
            </div>
            <div className="flex flex-row justify-between mt-6">
                <Button type={'submit'} variant={'outline'}>
                    Сохранить
                </Button>
                <Button type={'reset'} variant={'destructive'} size={'smallIcon'}>
                    <Trash className="scale-90" />
                </Button>
            </div>
        </form>
    )
}

export default ExistingCollectionWordPreview 