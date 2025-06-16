import Link from 'next/link';

interface ButtonProps {
    children?: React.ReactNode;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    text?: string;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'solid' | 'transparent';
}

export default function Button({
    children,
    href,
    onClick,
    icon,
    text,
    className = '',
    type = 'button',
    variant = 'solid'
}: ButtonProps) {
    const baseClasses = 'flex items-center justify-center font-medium border transition-all text-white border-gray-600';

    const variantClasses = variant === 'transparent'
        ? 'bg-gray-800 bg-opacity-80 hover:bg-opacity-90 px-2 sm:px-3 py-2 text-xs sm:text-sm sm:gap-2'
        : 'bg-gray-800 hover:bg-gray-700 px-3 py-2 text-sm gap-2';

    const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

    // アイコン+テキストパターン（ActionButton相当）
    if (icon && text) {
        const content = (
            <>
                {icon}
                <span className={variant === 'transparent' ? 'hidden sm:inline' : ''}>{text}</span>
            </>
        );

        if (href) {
            return (
                <Link href={href} className={combinedClasses}>
                    {content}
                </Link>
            );
        }

        return (
            <button type={type} onClick={onClick} className={combinedClasses}>
                {content}
            </button>
        );
    }

    // 通常のボタンパターン（AdminButton相当）
    if (href) {
        return (
            <Link href={href} className={combinedClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={combinedClasses}>
            {children}
        </button>
    );
} 