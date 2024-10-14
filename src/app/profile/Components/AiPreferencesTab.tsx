import React from 'react'
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import useUserPreferences from '@/hooks/useUserPreferences'
import { DifficultyType, PromptType } from '@/types/types'


const AiPreferencesTab = () => {

    const { promptType, changePromptType, knowledgeLevel, changeKnowledgeLevel } = useUserPreferences()

    return (
        <div className='w-full overflow-hidden'>
            <h3 className='text-2xl mb-5'>Настройка ассистента Плекси</h3>
            <div className='flex flex-col gap-4 text-balance'>
                <div>
                    <h4>1. Как вы хотите чтобы Плекси вам помог?</h4>
                    <p>Ассистент может приводить примеры использования слов или давать их определения.</p>
                    <ToggleGroup className='pt-1 self-start flex-wrap' type="single" value={promptType} onValueChange={(value: PromptType) => { changePromptType(value) }}>
                        <ToggleGroupItem variant={'outline'} value="examples" aria-label="Toggle examples">
                            Примеры
                        </ToggleGroupItem>
                        <ToggleGroupItem variant={'outline'} value="definition" aria-label="Toggle definition">
                            Определение
                        </ToggleGroupItem>
                    </ToggleGroup>

                </div>

                <div>
                    <h4>2. Укажите ваш уровень знания языка</h4>
                    <p>Ассистент будет помогать учитывая ваши знания, например давать более сложные или наоборот простые примеры.</p>
                    <ToggleGroup className='pt-1 self-start flex-wrap' type="single" value={knowledgeLevel} onValueChange={(value: DifficultyType) => { changeKnowledgeLevel(value) }}>
                        <ToggleGroupItem variant={'outline'} value="beginner" aria-label="Toggle beginner">
                            Начинающий
                        </ToggleGroupItem>
                        <ToggleGroupItem variant={'outline'} value="intermediate" aria-label="Toggle intermidiate">
                            Средний
                        </ToggleGroupItem>
                        <ToggleGroupItem variant={'outline'} value="advanced" aria-label="Toggle advanced">
                            Продвинутый
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>
        </div>
    )
}

export default AiPreferencesTab