import ComicViewer from '../../components/ComicViewer';
import { getComics } from '../../lib/getComics';
import { ComicsProvider } from '../../context/ComicsContext';

// 動的レンダリングを強制（プリレンダリングをスキップ）
export const dynamic = 'force-dynamic';

interface PageProps {
    params: {
        id: string;
    };
}

export default async function ComicPage({ params }: PageProps) {
    const comics = await getComics();

    return (
        <ComicsProvider initialComics={comics}>
            <ComicViewer mainComicId={params.id} />
        </ComicsProvider>
    );
}
