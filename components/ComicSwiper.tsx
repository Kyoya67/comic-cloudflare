'use client';

import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import ComicImageSlide from './ComicImageSlide';
import type { Comic } from '../types/comic';
import 'swiper/css';
import 'swiper/css/navigation';

interface ComicSwiperProps {
    comics: Comic[];
    selectedComic: Comic;
    onComicSelect: (comic: Comic) => void;
}

export default function ComicSwiper({ comics, selectedComic, onComicSelect }: ComicSwiperProps) {
    const sortedComics = [...comics].sort((a, b) => b.order - a.order);
    const initialIndex = sortedComics.findIndex(comic => comic.id === selectedComic.id);
    const swiperRef = useRef<SwiperType | null>(null);
    const isUpdatingFromOutside = useRef(false);

    useEffect(() => {
        if (swiperRef.current) {
            const newIndex = sortedComics.findIndex(comic => comic.id === selectedComic.id);
            if (newIndex !== -1 && newIndex !== swiperRef.current.activeIndex) {
                isUpdatingFromOutside.current = true;
                swiperRef.current.slideTo(newIndex);
            }
        }
    }, [selectedComic.id, sortedComics]);

    return (
        <div className="bg-gray-800 relative">
            <Swiper
                modules={[Navigation, Keyboard]}
                initialSlide={initialIndex}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {

                    if (isUpdatingFromOutside.current) {
                        isUpdatingFromOutside.current = false;
                        return;
                    }

                    const comic = sortedComics[swiper.activeIndex];
                    if (comic && comic.id !== selectedComic.id) {
                        onComicSelect(comic);
                    }
                }}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                keyboard={{
                    enabled: true,
                }}
                className="h-[500px]"
            >
                {sortedComics.map((comic) => (
                    <SwiperSlide key={comic.id}>
                        <ComicImageSlide
                            comic={comic}
                            isSelected={comic.id === selectedComic.id}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-button-prev hidden md:flex !text-white !text-2xl !w-12 !h-12 !mt-0 !top-1/2 !left-4 !transform !-translate-y-1/2 !items-center !justify-center"></div>
            <div className="swiper-button-next hidden md:flex !text-white !text-2xl !w-12 !h-12 !mt-0 !top-1/2 !right-4 !transform !-translate-y-1/2 !items-center !justify-center"></div>
        </div>
    );
} 