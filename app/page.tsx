import ComicViewer from '../components/ComicViewer';
import { getComics } from '../lib/getComics';

export default async function Home() {
  try {
    const comics = await getComics();
    const firstComicId = comics[0]?.id;

    return <ComicViewer initialComicId={firstComicId} />;
  } catch (error) {
    console.error('Failed to load comics:', error);
    return <ComicViewer />;
  }
}
