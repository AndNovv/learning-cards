"use client"
import EditNewWordCardInput from '@/components/Collection/Editable/EditNewWordCardInput';
import EditableCollectionWords from '@/components/Collection/Editable/EditableCollectionWords';
import { Button } from '@/components/ui/button';
import { deleteCollection, initEditedCollection, resetCollection, updateCollection } from '@/state/editedCollection/editedCollectionSlice';
import { AppDispatch, RootState } from '@/state/store';
import { deleteCollectionFromUser, editCollection } from '@/state/user/userSlice';
import { WordCollection } from '@/types/types';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CancelButtonWithAlert from './CancelButtonWithAlert';
import DeleteButtonWithAlert from './DeleteButtonWithAlert';

const EditableCollectionPage = ({ collection, setEditing }: { collection: WordCollection, setEditing: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const dispatch = useDispatch<AppDispatch>()
    const { user, loading, error } = useSelector((state: RootState) => state.user);

    const editedCollection = useSelector((state: RootState) => state.editedCollection)

    const router = useRouter()

    useEffect(() => {
        if (!editedCollection.collectionId || editedCollection.collectionId !== collection._id) {
            dispatch(initEditedCollection({ collectionId: collection._id, title: collection.title, author: collection.author, flashcards: collection.flashcards }))
        }
    }, [])

    const handleSaveClick = async () => {
        setEditing(false)
        if (editedCollection.collectionId) {
            const updatedCollection = await dispatch(updateCollection({ collectionId: editedCollection.collectionId, flashcards: editedCollection.flashcards }))
            dispatch(editCollection(updatedCollection.payload))
        }
    }

    const handleDeleteClick = () => {
        if (editedCollection.collectionId) {
            router.push('/')
            dispatch(deleteCollection({ userId: user._id }))
            dispatch(deleteCollectionFromUser(editedCollection.collectionId))
        }
    }

    const handleResetClick = () => {
        dispatch(resetCollection())
        setEditing(false)
    }

    return (
        <div className='relative flex flex-col xl:px-60 lg:px-40 md:px-20 px-1 h-full'>
            <div className='flex flex-col bg-background'>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <h1 className='text-xl mt-2'>{collection.title}</h1>
                        <p className='text-muted-foreground mt-2 mb-4'>{`Автор: ${collection.author}`}</p>
                    </div>

                    <div className='flex flex-row gap-2 items-center'>
                        <CancelButtonWithAlert handleResetClick={handleResetClick} />
                        <Button className='bg-emerald-600 hover:bg-emerald-700' onClick={handleSaveClick}>Сохранить</Button>
                        <DeleteButtonWithAlert handleDeleteClick={handleDeleteClick} />
                    </div>

                </div>
                <EditNewWordCardInput />

            </div>
            <EditableCollectionWords collection={editedCollection} />
        </div>
    )
}

export default EditableCollectionPage