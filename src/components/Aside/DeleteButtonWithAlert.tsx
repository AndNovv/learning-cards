import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash } from 'lucide-react'

const DeleteButtonWithAlert = ({ handleDeleteClick }: { handleDeleteClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }) => {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex items-center px-2 py-3 gap-4 text-red-500 hover:bg-accent transition-all cursor-pointer rounded-xl">
                    <Trash className='size-5' />
                    <p>Удалить</p>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Уверены</AlertDialogTitle>
                    <AlertDialogDescription>
                        Вы точно хотите удалить эту коллекцию?
                        Восстановить эти данные больше не получиться!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteClick}>Продолжить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteButtonWithAlert