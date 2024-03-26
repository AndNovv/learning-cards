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

const CancelButtonWithAlert = ({ handleResetClick }: { handleResetClick: () => void }) => {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={'outline'}>Отмена</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Уверены</AlertDialogTitle>
                    <AlertDialogDescription>
                        Вы точно хотите отменить все сделанные изменения?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Нет</AlertDialogCancel>
                    <AlertDialogAction onClick={handleResetClick}>Продолжить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CancelButtonWithAlert