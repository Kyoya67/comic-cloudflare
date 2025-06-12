import Viewer from '../components/comic/Viewer';
import { getComics } from '../lib/getComics';
import { ComicsProvider } from '../context/ComicsContext';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const comics = await getComics();

  return (
    <ComicsProvider initialComics={comics}>
      <Viewer />
    </ComicsProvider>
  );
}

