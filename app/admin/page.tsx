export const dynamic = 'force-dynamic';

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminContent from '../../components/admin/content';
import { getComics } from '../../lib/getComics';
import type { Comic } from '../../types/comic';

export default async function AdminPage() {
    const session = await auth();

    if (!session) {
        redirect('/auth/signin');
    }

    const comics: Comic[] = await getComics();

    return (
        <>
            <AdminContent comics={comics} />
        </>
    );
}