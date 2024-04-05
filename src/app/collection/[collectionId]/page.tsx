"use client"
import React, { useEffect, useState } from 'react'
import EditableCollectionPage from '@/components/Collection/Editable/EditableCollectionPage';
import CollectionPage from '@/components/Collection/Preview/CollectionPage';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/state/store';
import { useDispatch } from 'react-redux';
import { changeActiveCollection, resetActiveCollection } from '@/state/activeCollection/activeCollectionSlice';
import LoadingCollectionPage from '@/components/Collection/Preview/LoadingCollectionPage';

const SingleCollectionPage = ({ params }: { params: { collectionId: string } }) => {

    const [editing, setEditing] = useState(false)

    const { user, loading, error } = useSelector((state: RootState) => state.user);
    const favouriteCollections = user.collections

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(changeActiveCollection(params.collectionId))
        return () => {
            dispatch(resetActiveCollection())
        }
    }, [])

    const collection = favouriteCollections.find((element) => element._id === params.collectionId)


    if (loading) return <LoadingCollectionPage />
    if (!collection) return <div>Такой коллекции не существует...</div>


    return (
        <>
            {editing ? <EditableCollectionPage collection={collection} setEditing={setEditing} /> : <CollectionPage collection={collection} setEditing={setEditing} />}
        </>
    )
}

export default SingleCollectionPage