'use client';
import { SignInButton, BackButton } from '../../../components/controls';

export default function SignIn() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-gray-800 shadow-xl p-8 border border-gray-700">
                    <div className="text-center mb-8">
                        <p className="text-gray-400">
                            管理者専用ログイン
                        </p>
                    </div>

                    <SignInButton provider="github" />
                </div>

                <div className="mt-6 text-center">
                    <BackButton />
                </div>
            </div>
        </div>
    );
} 