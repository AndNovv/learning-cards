import { DifficultyType, PromptType } from "@/types/types"
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

export const promptBuilder = (word: string, promptType: PromptType = 'examples', difficulty: DifficultyType = 'beginner') => {
    let prompt = '';

    if (promptType === 'examples') {
        if (difficulty === 'beginner') {
            prompt = `Provide 3 short and simple example sentences using the word or phrase "${word}". Keep each sentence easy to understand.`;
        } else if (difficulty === 'intermediate') {
            prompt = `Provide 3 example sentences using the word or phrase "${word}". Make the sentences suitable for someone with an intermediate level of English.`;
        } else if (difficulty === 'advanced') {
            prompt = `Provide 3 complex example sentences using the word or phrase "${word}". Use advanced vocabulary and structure.`;
        }
    } else if (promptType === 'definition') {
        if (difficulty === 'beginner') {
            prompt = `What does the word or phrase "${word}" mean? Explain it in simple terms that a beginner would understand.`;
        } else if (difficulty === 'intermediate') {
            prompt = `What does the word or phrase "${word}" mean? Provide a definition suitable for someone with an intermediate level of English.`;
        } else if (difficulty === 'advanced') {
            prompt = `What does the word or phrase "${word}" mean? Provide a detailed definition suitable for someone with an advanced level of English.`;
        }
    }

    return prompt;
}