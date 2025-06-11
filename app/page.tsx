import ComicViewer from '../components/ComicViewer';
import { getComics } from '../lib/getComics';
import { ComicsProvider } from '../context/ComicsContext';

// 動的レンダリングを強制（プリレンダリングをスキップ）
export const dynamic = 'force-dynamic';

export default async function Home() {
  const comics = await getComics();

  return (
    <ComicsProvider initialComics={comics}>
      <ComicViewer />
    </ComicsProvider>
  );
}

