import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// ページのPropsの型定義
type ProfileDetailPageProps = {
  params: Promise<{
    publicId: string;
  }>;
};

export default async function ProfileDetailPage({ params }: ProfileDetailPageProps) {
  const {publicId} = await params;
  // 1. URLから受け取ったpublicIdを使って、DBから特定のプロフィールを1件だけ取得
  const profile = await prisma.profiles.findFirst({
    where: {
      public_id: publicId,
    },
  });

  // 2. もしプロフィールが見つからなければ、404 Not Foundページを表示
  if (!profile) {
    notFound();
  }

  // 3. 取得したデータを表示する
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center">
          <p className="text-sm text-cyan-400 mb-2">Lookbook Profile</p>
          <h1 className="text-4xl md:text-5xl font-bold">{profile.name ?? '未設定の名前'}</h1>
          <p className="text-gray-400 mt-2">{profile.email}</p>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-8">
          <h2 className="text-xl font-semibold mb-4">スキル</h2>
          <p className="text-lg text-gray-300 bg-gray-700 p-4 rounded-lg">
            {profile.skill ?? 'スキルはまだ設定されていません。'}
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-block bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}