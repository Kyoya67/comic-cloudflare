import Link from 'next/link';

interface AdminButtonProps {
    children: React.ReactNode;
    href?: string;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

export default function AdminButton({
    children,
    href,
    className = '',
    type = 'button'
}: AdminButtonProps) {
    const baseClasses = 'flex items-center justify-center gap-2 font-medium border transition-all px-3 py-2 text-sm bg-gray-800 text-white border-gray-600 hover:bg-gray-700';

    const combinedClasses = `${baseClasses} ${className}`;

    if (href) {
        return (
            <Link
                href={href}
                className={combinedClasses}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={combinedClasses}
        >
            {children}
        </button>
    );
} 