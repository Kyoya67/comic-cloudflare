'use client';

import { useState, useEffect } from 'react';
import ComicMainDisplay from './ComicMainDisplay';
import ComicList from './ComicList';
import { getComics } from '../lib/getComics';
import { getComic } from '../lib/getComic';
import type { Comic } from '../types/comic';

interface ComicViewerProps {
    mainComicId?: string;
}

export default function ComicViewer({ mainComicId }: ComicViewerProps) {
    // クライアントサイドでのみログ出力
    if (typeof window !== 'undefined') {
        console.log(`🚀 ComicViewer rendered with mainComicId: ${mainComicId}`);
    }

    const [comics, setComics] = useState<Comic[]>([]);
    const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
    const [loading, setLoading] = useState(true);
    const [initialLoadDone, setInitialLoadDone] = useState(false);

    // マウント時のログ（クライアントサイドのみ）
    useEffect(() => {
        console.log('📦 ComicViewer mounted');
        return () => {
            console.log('📤 ComicViewer unmounted');
        };
    }, []);

    // 初回の全データ取得（一度だけ）
    useEffect(() => {
        console.log(`🔄 useEffect[initialLoad] triggered - initialLoadDone: ${initialLoadDone}, mainComicId: ${mainComicId}`);

        async function loadInitialComics() {
            if (initialLoadDone) {
                console.log('⏭️ Skipping initial load - already done');
                return;
            }

            console.log('🎯 Starting initial load...');
            try {
                const data = await getComics();
                setComics(data);
                setInitialLoadDone(true);

                // 初回時のみ選択コミック設定
                if (mainComicId) {
                    const targetComic = data.find(comic => comic.id === mainComicId);
                    setSelectedComic(targetComic || data[0]);
                    console.log(`🎯 Initial comic selected: ${targetComic?.title || data[0]?.title}`);
                } else {
                    setSelectedComic(data[0]);
                    console.log(`🎯 Default comic selected: ${data[0]?.title}`);
                }
            } catch (error) {
                console.error('Failed to load comics:', error);
            } finally {
                setLoading(false);
            }
        }
        loadInitialComics();
    }, [initialLoadDone, mainComicId]);

    // mainComicIdが変化した時の処理（初回ロード完了後のみ）
    useEffect(() => {
        console.log(`🔄 useEffect[mainComicIdChange] triggered - initialLoadDone: ${initialLoadDone}, mainComicId: ${mainComicId}, comics.length: ${comics.length}`);

        if (!initialLoadDone || !mainComicId) {
            console.log('⏭️ Skipping mainComicId change - conditions not met');
            return;
        }

        async function handleComicIdChange() {
            if (typeof mainComicId !== 'string') return;

            console.log(`🔍 Looking for existing comic with id: ${mainComicId}`);
            const existingComic = comics.find(comic => comic.id === mainComicId);

            if (existingComic) {
                console.log(`✨ Using existing comic: ${existingComic.title}`);
                setSelectedComic(existingComic);
            } else {
                console.log(`🌐 Fetching new comic with id: ${mainComicId}`);
                try {
                    const comic = await getComic(mainComicId);
                    if (comic) {
                        setSelectedComic(comic);
                        setComics(prev => [...prev, comic]);
                        console.log(`✅ New comic added: ${comic.title}`);
                    } else {
                        setSelectedComic(comics[0] || null);
                        console.log('❌ Comic not found, using fallback');
                    }
                } catch (error) {
                    console.error('Failed to load comic:', error);
                    setSelectedComic(comics[0] || null);
                }
            }
        }

        handleComicIdChange();
    }, [mainComicId, initialLoadDone, comics]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-lg">読み込み中...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {selectedComic && (
                    <ComicMainDisplay
                        selectedComic={selectedComic}
                        comics={comics}
                    />
                )}
                <ComicList
                    comics={comics}
                    selectedComicId={selectedComic?.id || null}
                />
            </main>
        </div>
    );
} 