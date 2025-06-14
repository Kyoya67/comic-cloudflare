'use client';

import { useRouter } from 'next/navigation';

interface BackButtonProps {
    href?: string;
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
}

export default function BackButton({
    href = '/',
    onClick,
    children = '← 帰れ',
    className = ''
}: BackButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            router.push(href);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`text-gray-400 hover:text-white transition-colors text-sm ${className}`}
        >
            {children}
        </button>
    );
} 