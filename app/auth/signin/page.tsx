'use client';

import { getSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SignInButton, BackButton } from '../../../components/controls';

export default function SignIn() {
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession();
            if (session) {
                router.push('/admin');
            }
        };
        checkSession();
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-gray-800 shadow-xl p-8 border border-gray-700">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Real Fight
                        </h1>
                        <p className="text-gray-400">
                            チョーヤ専用ログイン
                        </p>
                    </div>

                    <SignInButton />

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            チョーヤのみアクセス可能
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <BackButton />
                </div>
            </div>
        </div>
    );
} 