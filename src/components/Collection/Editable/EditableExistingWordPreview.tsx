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
import { useEffect, useRef } from "react"
import { AppDispatch } from "@/state/store"
import { useDispatch } from "react-redux"
import { deleteFlashcard, editFlashcard } from "@/state/editedCollection/editedCollectionSlice"

const EditableExistingCollectionWordPreview = ({ collectionId, flashcard, flashcardIndex, isDesktop }: { collectionId: string, flashcard: FlashCardType, flashcardIndex: number, isDesktop: boolean }) => {
    const [open, setOpen] = React.useState(false)


    const englishRef = useRef<HTMLParagraphElement>(null);
    const russianRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (englishRef.current && russianRef.current) {
            const range = document.createRange();
            const englishText = englishRef.current.childNodes[0];
            const russianText = russianRef.current.childNodes[0];

            range.setStartBefore(englishText);
            range.setEndAfter(englishText);

            const englishClientRect = range.getBoundingClientRect();
            englishRef.current.style.width = `${englishClientRect.width}px`;

            range.setStartBefore(russianText);
            range.setEndAfter(russianText);

            const russianClientRect = range.getBoundingClientRect();
            russianRef.current.style.width = `${russianClientRect.width}px`;
        }
    }, [flashcard.english, flashcard.russian]);

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className='flex flex-row hover:bg-hover transition-all items-center cursor-pointer px-4 py-3 justify-between gap-4'>
                        <div className='flex flex-row w-full items-center text-balance'>
                            <p ref={englishRef}>{flashcard.english}</p>
                            <span className='mx-2'>-</span>
                            <p ref={russianRef}>{flashcard.russian}</p>
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
                    <ModalWindowDialog collectionId={collectionId} setOpen={setOpen} flashcard={flashcard} flashcardIndex={flashcardIndex} />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <div className='flex flex-row hover:bg-secondary items-center transition-all cursor-pointer px-4 py-3 justify-between gap-4'>
                    <div className='flex flex-row w-full items-center text-balance'>
                        <p ref={englishRef}>{flashcard.english}</p>
                        <span className='mx-2'>-</span>
                        <p ref={russianRef}>{flashcard.russian}</p>
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
                    <ModalWindowDialog collectionId={collectionId} setOpen={setOpen} flashcard={flashcard} flashcardIndex={flashcardIndex} />
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}

const ModalWindowDialog = ({ collectionId, setOpen, flashcard, flashcardIndex }: { collectionId: string, setOpen: React.Dispatch<React.SetStateAction<boolean>>, flashcard: FlashCardType, flashcardIndex: number }) => {

    const dispatch = useDispatch<AppDispatch>()

    const englishModalInputRef = useRef<HTMLInputElement>(null)
    const russianModalInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        englishModalInputRef?.current?.focus()
    }, [englishModalInputRef])

    return (
        <form
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault()
                setOpen(false)
                if (englishModalInputRef.current?.value && russianModalInputRef.current?.value) {
                    dispatch(editFlashcard({ flashcardIndex, flashcard: { ...flashcard, english: englishModalInputRef.current.value, russian: russianModalInputRef.current.value } }))
                }
            }}
            onReset={(e: React.FormEvent) => {
                e.preventDefault()
                setOpen(false)
                dispatch(deleteFlashcard(flashcardIndex))
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

export default EditableExistingCollectionWordPreview 