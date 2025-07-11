'use client';

import { Button, SignOutButton } from '../controls';

interface AdminHeaderProps {
    onAddClick?: () => void;
}

export default function AdminHeader({ onAddClick }: AdminHeaderProps) {
    return (
        <header className="bg-gray-900 border-b border-gray-400">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
                    <h1 className="text-xl sm:text-3xl font-bold text-white">
                        管理画面
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <Button onClick={onAddClick}>
                            新規追加
                        </Button>
                        <Button href="/">
                            トップに戻る
                        </Button>
                        <SignOutButton />
                    </div>
                </div>
            </div>
        </header>
    );
} 