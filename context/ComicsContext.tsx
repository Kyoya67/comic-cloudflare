'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Comic } from '../types/comic';

interface ComicsContextType {
    comics: Comic[];
    selectedComic: Comic | null;
    setSelectedComic: (comic: Comic) => void;
}

const ComicsContext = createContext<ComicsContextType | undefined>(undefined);

export function ComicsProvider({
    children,
    initialComics
}: {
    children: ReactNode;
    initialComics: Comic[];
}) {
    const [comics] = useState<Comic[]>(initialComics);
    const [selectedComic, setSelectedComic] = useState<Comic | null>(null);

    return (
        <ComicsContext.Provider value={{ comics, selectedComic, setSelectedComic }}>
            {children}
        </ComicsContext.Provider>
    );
}

export function useComics() {
    const context = useContext(ComicsContext);
    if (context === undefined) {
        throw new Error('useComics must be used within a ComicsProvider');
    }
    return context;
} 