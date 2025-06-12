import Viewer from '../components/comic/Viewer';
import { getComics } from '../lib/getComics';
import { ComicsProvider } from '../context/ComicsContext';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const comics = await getComics();
  const sortedComics = [...comics].sort((a, b) => b.order - a.order);

  return (
    <ComicsProvider initialComics={sortedComics}>
      <Viewer />
    </ComicsProvider>
  );
}

