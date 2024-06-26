import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Pause, Play, UndoDot, RedoDot, ChevronLeft } from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import { RootState } from '@/state/store'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const AudioPlayer = ({ src }: { src: string }) => {

    const audioPlayerRef = useRef<HTMLAudioElement>(null)
    const intervalRef = useRef<number | null>(null);

    const { isDesktop } = useSelector((state: RootState) => state.asideMenu)

    const [isPlaying, setIsPlaying] = useState(false)
    const [isOpen, setIsOpen] = useState(true)

    const [duration, setDuration] = useState(60)
    const [currentTime, setCurrentTime] = useState(0)

    const refreshProgressBarIntervalTime = 1000

    useEffect(() => {
        setIsOpen(isDesktop || false)
    }, [isDesktop])

    const handlePlayButton = useCallback(() => {
        if (isPlaying) {
            setIsPlaying(false)
            audioPlayerRef.current?.pause()
        }
        else {
            setIsPlaying(true)
            audioPlayerRef.current?.play()
        }
    }, [isPlaying])

    // Обновление Прогресс Бара
    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = window.setInterval(() => {
                if (audioPlayerRef.current) {
                    setCurrentTime(audioPlayerRef.current.currentTime);
                }
            }, refreshProgressBarIntervalTime);
        }
        else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };

    }, [isPlaying])

    // Hotkeys (Space - Play/Pause, RightArrow - skip 5 sec, LeftArrow - prev 5 sec )
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.preventDefault()
            switch (event.key) {
                case ' ':
                    handlePlayButton()
                    break
                case 'ArrowLeft':
                    changeCurrentTime(currentTime > 5 ? currentTime - 5 : 0)
                    break
                case "ArrowRight":
                    changeCurrentTime(currentTime + 5 > duration ? duration : currentTime + 5)
                    break
                default:
                    break
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentTime, duration, handlePlayButton]);

    function changeCurrentTime(value: number) {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.currentTime = value
        }
        setCurrentTime(value)
    }

    return (
        <div className='flex justify-end absolute right-0 top-0 w-full md:w-auto h-16'>
            <audio ref={audioPlayerRef} onLoadedMetadata={() => setDuration(audioPlayerRef.current?.duration || 60)}>
                <source src={src} type="audio/aac" />
            </audio>

            <div className={cn(isOpen ? 'w-full' : 'w-fit', 'flex justify-end gap-4 items-center py-3 px-4 rounded-xl bg-[#505056] border border-gray-500')}>
                <motion.div
                    animate={isOpen ? 'open' : 'closed'}
                    variants={{
                        open: { rotate: 180 },
                        closed: { rotate: 0 }
                    }}
                >
                    <ChevronLeft onClick={() => setIsOpen((prev) => !prev)} className='flex-1' />
                </motion.div>

                {isOpen && (
                    <div className='flex flex-1 w-auto md:w-60 gap-2 items-center'>
                        <UndoDot
                            onClick={() => changeCurrentTime(currentTime > 5 ? currentTime - 5 : 0)}
                            className='size-8 border rounded-full shrink-0 p-2 cursor-pointer border-gray-500 hover:bg-[#696a6d]'
                        />
                        <Slider className='cursor-pointer flex-1' onValueChange={([value]) => { changeCurrentTime(value) }} value={[currentTime]} defaultValue={[currentTime]} max={duration} step={1} />
                        <RedoDot
                            onClick={() => changeCurrentTime(currentTime + 5 > duration ? duration : currentTime + 5)}
                            className='size-8 border rounded-full shrink-0 p-2 cursor-pointer border-gray-500 hover:bg-[#696a6d]'
                        />
                    </div>
                )}

                {isPlaying ?
                    <Pause className='cursor-pointer border rounded-full size-10 shrink-0 p-2 border-gray-500 hover:bg-[#696a6d]' onClick={handlePlayButton} /> :
                    <Play className='cursor-pointer border rounded-full size-10 shrink-0 p-2 border-gray-500 hover:bg-[#696a6d]' onClick={handlePlayButton} />
                }
            </div>

        </div >
    )
}

export default AudioPlayer
