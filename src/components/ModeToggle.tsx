"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} variant="outline" className="shrink-0 size-14 rounded-full">
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

    )
}
