import { useRouter } from 'next/navigation';
import { ActionButton } from '../controls';

interface SliderActionsProps {
    onOpenModal: () => void;
}

export default function SliderActions({ onOpenModal }: SliderActionsProps) {
    const router = useRouter();

    const fullscreenIcon = (
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
            <path strokeWidth={2} d="M9 9h6v6H9z" />
        </svg>
    );

    const adminIcon = (
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
    );

    return (
        <div className="absolute bottom-4 right-4 z-10 flex flex-col sm:flex-row gap-2">
            <ActionButton
                onClick={onOpenModal}
                icon={fullscreenIcon}
                text="全画面"
            />
            <ActionButton
                onClick={() => router.push('/admin')}
                icon={adminIcon}
                text="管理画面"
            />
        </div>
    );
} 