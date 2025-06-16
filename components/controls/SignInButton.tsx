'use client';

import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignInButton({
    provider,
    className = '',
    showErrorMessage = true
}: {
    provider: string;
    className?: string;
    showErrorMessage?: boolean;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSignIn = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await signIn(provider, {
                callbackUrl: '/admin',
                redirect: false
            });

            if (result?.url) {
                window.location.href = result.url;
            } else if (result?.error) {
                setError('管理者権限がありません');
            } else if (result?.ok) {
                router.push('/admin');
            }
        } catch (error) {
            setError('管理者権限がありません');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <button
                onClick={handleSignIn}
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-700 hover:bg-gray-600 
                          disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium 
                          transition-colors duration-200 ${className}`}
            >
                {isLoading ? (
                    <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                            <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        サインイン中...
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                        {provider}でサインイン
                    </>
                )}
            </button>

            {error && showErrorMessage && (
                <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                        </svg>
                        <span>{error}</span>
                    </div>
                </div>
            )}
        </div>
    );
} 