import ComicViewer from '../../components/ComicViewer';
import Header from '../../components/Header';

interface PageProps {
    params: {
        id: string;
    };
}

export default function ComicPage({ params }: PageProps) {
    return (
        <>
            <Header />
            <ComicViewer mainComicId={params.id} />
        </>
    );
}
