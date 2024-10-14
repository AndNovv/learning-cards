"use client"
import EditNewWordCardInput from '@/components/Collection/Editable/EditNewWordCardInput';
import EditableCollectionWords from '@/components/Collection/Editable/EditableCollectionWords';
import { Button } from '@/components/ui/button';
import { initEditedCollection, resetCollection, updateCollection } from '@/state/editedCollection/editedCollectionSlice';
import { AppDispatch, RootState } from '@/state/store';
import { editCollection } from '@/state/user/userSlice';
import { WordCollection } from '@/types/types';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CancelButtonWithAlert from './CancelButtonWithAlert';

const EditableCollectionPage = ({ collection, setEditing }: { collection: WordCollection, setEditing: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const dispatch = useDispatch<AppDispatch>()


    const { user } = useSelector((state: RootState) => state.user)
    const editedCollection = useSelector((state: RootState) => state.editedCollection)

    useEffect(() => {
        if (!editedCollection.collectionId || editedCollection.collectionId !== collection._id) {
            dispatch(initEditedCollection({ collectionId: collection._id, title: collection.title, author: collection.author, authorId: collection.authorId, flashcards: collection.flashcards }))
        }
    }, [])

    const handleSaveClick = async () => {
        setEditing(false)
        if (editedCollection.collectionId) {
            const updatedCollection = await dispatch(updateCollection({ userId: user._id, collectionId: editedCollection.collectionId, newCards: editedCollection.newCards, deletedCards: editedCollection.deletedCards, updatedCards: editedCollection.updatedCards })).unwrap()
            if (updatedCollection) {
                dispatch(editCollection(updatedCollection))
            }
        }
    }

    const handleResetClick = () => {
        dispatch(resetCollection())
        setEditing(false)
    }

    return (
        <div className='relative flex flex-col gap-2 h-full pt-6 md:pt-0 overflow-hidden'>
            <div className='flex flex-col gap-2 bg-background sticky top-0 z-10 paddings'>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <h3>{collection.title}</h3>
                        <span className='text-muted-foreground mt-2'>{`Автор: ${collection.author}`}</span>
                    </div>

                    <div className='flex flex-row gap-2 items-center'>
                        <CancelButtonWithAlert handleResetClick={handleResetClick} />
                        <Button className='bg-emerald-600 hover:bg-emerald-700' onClick={handleSaveClick}>Сохранить</Button>
                    </div>

                </div>
                <EditNewWordCardInput />

            </div>
            <EditableCollectionWords collection={editedCollection} />
        </div>
    )
}

export default EditableCollectionPage