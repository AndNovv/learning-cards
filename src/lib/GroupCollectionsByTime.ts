import { WordCollection } from "@/types/types";

export const groupCollectionsByTime = (collections: WordCollection[]) => {

    const favouriteCollections = [...collections].reverse()

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const previous7Days = new Date(today);
    previous7Days.setDate(today.getDate() - 7);

    const previousMonth = new Date(today);
    previousMonth.setMonth(today.getMonth() - 1);

    const groupedCollections = {
        Today: [] as WordCollection[],
        Yesterday: [] as WordCollection[],
        Week: [] as WordCollection[],
        Month: [] as WordCollection[],
        Later: [] as WordCollection[],
    };

    favouriteCollections.forEach(collection => {

        const collectionDate = new Date(collection.lastUpdateAt);
        collectionDate.setHours(0, 0, 0, 0);

        if (collectionDate.getTime() === today.getTime()) {
            groupedCollections.Today.push(collection);
        } else if (collectionDate.getTime() === yesterday.getTime()) {
            groupedCollections.Yesterday.push(collection);
        } else if (collectionDate.getTime() > previous7Days.getTime()) {
            groupedCollections.Week.push(collection);
        } else if (collectionDate.getTime() > previousMonth.getTime()) {
            groupedCollections.Month.push(collection);
        }
        else {
            groupedCollections.Later.push(collection);
        }
    });

    return groupedCollections;
}