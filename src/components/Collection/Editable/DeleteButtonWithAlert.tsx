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
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

const CancelButtonWithAlert = ({ handleDeleteClick }: { handleDeleteClick: () => void }) => {


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={'destructive'} size={'smallIcon'}>
                    <Trash className='size-5' />
                </Button>
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

export default CancelButtonWithAlert