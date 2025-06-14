import Link from 'next/link';

interface AdminButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export default function AdminButton({
    children,
    onClick,
    href,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    type = 'button'
}: AdminButtonProps) {
    const baseClasses = 'flex items-center justify-center gap-2 font-medium border transition-all';

    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2 text-sm sm:text-base',
        lg: 'px-6 py-3 text-base'
    };

    const variantClasses = {
        primary: 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700',
        secondary: 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200',
        danger: 'bg-red-600 text-white border-red-500 hover:bg-red-700'
    };

    const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

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
            onClick={onClick}
            disabled={disabled}
            className={`${combinedClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    );
} 