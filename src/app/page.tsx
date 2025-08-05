import { PrismaClient } from '@prisma/client';

// PrismaClientのインスタンスを作成します
// これがデータベースとの対話窓口になります
const prisma = new PrismaClient();

export default async function Home() {
  // サーバーサイドでPrismaを使って全プロフィールを取得します
  const profiles = await prisma.profiles.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-10">Lookbook</h1>

      <div className="w-full max-w-2xl">
        {/* プロフィールが1件以上あるかチェック */}
        {profiles.length > 0 ? (
          <ul className="space-y-4">
            {/* 取得したプロフィールを一つずつ表示 */}
            {profiles.map((profile) => (
              <li key={profile.id} className="bg-gray-800 p-6 rounded-xl shadow-lg transition-transform hover:scale-105">
                {/* profile. と打つとnameやskillが補完されるのを体感してみてください！ */}
                <p className="text-2xl font-semibold text-cyan-400">{profile.name}</p>
                <p className="text-gray-300 mt-1">Skill: {profile.skill ?? '未設定'}</p>
                <p className="text-xs text-gray-500 mt-3">ID: {profile.id}</p>
              </li>
            ))}
          </ul>
        ) : (
          // プロフィールが1件もなかった場合に表示
          <div className="text-center bg-gray-800 p-8 rounded-xl">
            <p className="text-lg">まだプロフィールが登録されていません。</p>
            <p className="text-gray-400 mt-2">Supabaseの管理画面からデータを登録してみましょう！</p>
          </div>
        )}
      </div>
    </main>
  );
}