import { RootState } from '@/state/store';
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const useFavoritePublishedCollections = () => {

    const [favouritePublishedCollections, setFavouritePublishedCollections] = useState<string[]>([]);

    const { user } = useSelector((state: RootState) => state.user)

    const getFavouritePublishedCollections = useCallback(() => {
        const favCollections: string[] = [];
        for (let i = 0; i < user.collections.length; i++) {
            const ref = user.collections[i].publishedCollectionRef;
            if (ref) {
                favCollections.push(ref);
            }
        }
        setFavouritePublishedCollections(favCollections);
    }, [user.collections]);

    useEffect(() => {
        getFavouritePublishedCollections();
    }, [getFavouritePublishedCollections]);

    return favouritePublishedCollections
}

export default useFavoritePublishedCollections