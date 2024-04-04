import axios from "axios"

export const deleteCollectionDB = async (collectionId: string) => {

    console.log('deleting')
    try {
        await axios.delete(`/api/collection/${collectionId}`)
    }
    catch (e) {
        console.log("Ошибка удаления коллекции")
    }
}