'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface SignOutButtonProps {
    callbackUrl?: string;
    className?: string;
}

export default function SignOutButton({ callbackUrl = '/', className = '' }: SignOutButtonProps) {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut({
                callbackUrl,
                redirect: false
            });

            if (typeof window !== 'undefined') {
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = callbackUrl;
            } else {
                router.push(callbackUrl);
            }
        } catch (error) {
            console.error(error);
            router.push(callbackUrl);
        }
    };

    return (
        <button
            type="button"
            onClick={handleSignOut}
            className={`flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white text-sm font-medium border border-red-500 hover:bg-red-700 transition-all ${className}`}
        >
            サインアウト
        </button>
    );
} 