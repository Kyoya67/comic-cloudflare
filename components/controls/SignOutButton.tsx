'use client';

import { signOut } from 'next-auth/react';

interface SignOutButtonProps {
    callbackUrl?: string;
    className?: string;
}

export default function SignOutButton({ callbackUrl = '/', className = '' }: SignOutButtonProps) {
    return (
        <button
            type="button"
            onClick={() => signOut({ callbackUrl })}
            className={`flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white text-sm font-medium border border-red-500 hover:bg-red-700 transition-all ${className}`}
        >
            サインアウト
        </button>
    );
} 