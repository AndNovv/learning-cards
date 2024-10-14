import * as React from "react"
import { AnyFlashCard, FlashCardType } from "@/types/types"
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const ExistingCollectionWordPreview = ({ flashcard, handleAiButtonClick }: { flashcard: AnyFlashCard, handleAiButtonClick: (word: string) => void }) => {

    const englishRef = useRef<HTMLSpanElement>(null);
    const russianRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (englishRef.current && russianRef.current) {
            const range = document.createRange();
            const englishText = englishRef.current.childNodes[0];
            const russianText = russianRef.current.childNodes[0];

            range.setStartBefore(englishText);
            range.setEndAfter(englishText);

            const englishClientRect = range.getBoundingClientRect();
            englishRef.current.style.width = `${englishClientRect.width}px`;

            range.setStartBefore(russianText);
            range.setEndAfter(russianText);

            const russianClientRect = range.getBoundingClientRect();
            russianRef.current.style.width = `${russianClientRect.width}px`;
        }
    }, [flashcard.english, flashcard.russian]);

    return (
        <div className='flex flex-row w-full hover:bg-hover transition-all cursor-pointer px-4 py-3 justify-between gap-4'>
            <div className='flex flex-row flex-1 items-center text-balance'>
                <span ref={englishRef}>{flashcard.english}</span>
                <span className='mx-2'>-</span>
                <span ref={russianRef}>{flashcard.russian}</span>
            </div>
            <Button variant={'ai'} onClick={() => handleAiButtonClick(flashcard.english)}>AI</Button>
        </div>
    )
}

export default ExistingCollectionWordPreview 