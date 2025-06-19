'use client';

interface NavigationTabsProps {
    activeTab: 'list' | 'comments';
    onTabChange: (tab: 'list' | 'comments') => void;
    children?: React.ReactNode;
}

const ListIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 12h18" />
        <path d="M3 6h18" />
        <path d="M3 18h18" />
    </svg>
);

const CommentIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

interface TabProps {
    value: 'list' | 'comments';
    isActive: boolean;
    onSelect: (value: 'list' | 'comments') => void;
    icon: React.ReactNode;
    label: string;
}

const Tab = ({ value, isActive, onSelect, icon, label }: TabProps) => {
    const baseClasses = "flex items-center justify-center gap-2 p-4 font-medium transition-colors";
    const activeClasses = "bg-blue-50 text-blue-600 border-b-2 border-blue-600";
    const inactiveClasses = "text-gray-600 hover:text-gray-900 hover:bg-gray-100";

    return (
        <label className="flex-1 cursor-pointer">
            <input
                type="radio"
                name="navigation"
                value={value}
                checked={isActive}
                onChange={() => onSelect(value)}
                className="sr-only"
            />
            <div className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                {icon}
                <span>{label}</span>
            </div>
        </label>
    );
};

export default function NavigationTabs({ activeTab, onTabChange, children }: NavigationTabsProps) {
    return (
        <div className="flex flex-col w-[80vw] mx-auto">
            <div className="flex bg-white">
                <Tab
                    value="list"
                    isActive={activeTab === 'list'}
                    onSelect={onTabChange}
                    icon={<ListIcon />}
                    label="漫画一覧"
                />
                <Tab
                    value="comments"
                    isActive={activeTab === 'comments'}
                    onSelect={onTabChange}
                    icon={<CommentIcon />}
                    label="コメント"
                />
            </div>
            <div>
                {children}
            </div>
        </div>
    );
} 