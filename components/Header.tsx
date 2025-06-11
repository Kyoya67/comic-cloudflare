import Link from "next/link";
import HeaderReveal from "./HeaderReveal";

export default function Header() {
    return (
        <HeaderReveal>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <Link href="/">
                            <h1 className="text-3xl font-bold text-gray-900">Real Fight</h1>
                        </Link>
                        <Link
                            href="/admin"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            管理画面
                        </Link>
                    </div>
                </div>
            </header>
        </HeaderReveal>
    );
} 