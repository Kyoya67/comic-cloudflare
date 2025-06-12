import Link from 'next/link';

interface AdminHeaderProps {
    showAddButton?: boolean;
}

export default function AdminHeader({ showAddButton = true }: AdminHeaderProps) {
    return (
        <header className="bg-gray-900 border-b border-gray-400">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
                    <h1 className="text-xl sm:text-3xl font-bold text-white">
                        管理画面
                        <span className="text-sm sm:text-lg inline-block ml-2">
                            {showAddButton ? '／ 編集・削除' : '／ 新規追加'}
                        </span>
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        {showAddButton ? (
                            <Link
                                href="/admin/add"
                                className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 text-white text-sm font-medium border border-gray-600 hover:bg-gray-700 transition-all"
                            >
                                新規追加
                            </Link>
                        ) : (
                            <Link
                                href="/admin"
                                className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 text-white text-sm font-medium border border-gray-600 hover:bg-gray-700 transition-all"
                            >
                                管理画面に戻る
                            </Link>
                        )}
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 text-white text-sm font-medium border border-gray-600 hover:bg-gray-700 transition-all"
                        >
                            トップに戻る
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
} 