import { DifficultyType, PromptType } from "@/types/types";
import { useState, useEffect } from "react";

const useUserPreferences = () => {
    const [promptType, setPromptType] = useState<PromptType>('examples')
    const [knowledgeLevel, setKnowledgeLevel] = useState<DifficultyType>('intermediate')

    const changePromptType = (value: PromptType) => {
        localStorage.setItem('promptType', value)
        setPromptType(value)
    }

    const changeKnowledgeLevel = (value: DifficultyType) => {
        localStorage.setItem('knowledgeLevel', value)
        setKnowledgeLevel(value)
    }


    useEffect(() => {

        localStorage.getItem("promptType") ?
            setPromptType(localStorage.getItem("promptType") as PromptType) :
            localStorage.setItem("promptType", 'examples')

        localStorage.getItem("knowledgeLevel") ?
            setKnowledgeLevel(localStorage.getItem("knowledgeLevel") as DifficultyType) :
            localStorage.setItem("knowledgeLevel", 'intermediate')

    }, [])

    return { promptType, changePromptType, knowledgeLevel, changeKnowledgeLevel }
}

export default useUserPreferences;