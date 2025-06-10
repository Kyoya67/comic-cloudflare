import ComicViewer from '../../components/ComicViewer';

interface PageProps {
    params: {
        id: string;
    };
}

export default function ComicPage({ params }: PageProps) {
    return <ComicViewer mainComicId={params.id} />;
}
