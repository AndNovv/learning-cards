import React, { useEffect, useRef } from 'react'

const PublishedCollectionWord = ({ flashcard }: { flashcard: { english: string, russian: string } }) => {

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
        <div className='flex flex-row hover:bg-secondary transition-all cursor-pointer px-4 py-3 justify-between gap-4'>
            <div className='flex flex-row w-full items-center text-balance my-2'>
                <span ref={englishRef}>{flashcard.english}</span>
                <span className='mx-2'>-</span>
                <span ref={russianRef}>{flashcard.russian}</span>
            </div>
        </div>
    )
}

export default PublishedCollectionWord