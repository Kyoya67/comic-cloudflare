import { useState, useEffect } from 'react';

export function useBlobUrl(file: File | null): string | null {
    const [blobUrl, setBlobUrl] = useState<string | null>(null);

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setBlobUrl(url);

            return () => {
                URL.revokeObjectURL(url);
            };
        } else {
            setBlobUrl(null);
        }
    }, [file]);

    return blobUrl;
} 