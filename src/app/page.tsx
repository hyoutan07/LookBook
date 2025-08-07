import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server' // server用のクライアントをインポート
import Link from 'next/link'
import { redirect } from 'next/navigation'

// ログアウト用のフォームコンポーネント
function LogoutButton() {
  // Server Actionを使ってログアウト処理
  const signOut = async (formData: FormData) => {
    'use server' // Server Actionとしてマーク
    const supabase = await createClient()
    await supabase.auth.signOut()
    return redirect('/login') // ログインページにリダイレクト
  }

  return (
    <form action={signOut}>
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        ログアウト
      </button>
    </form>
  )
}

function EditProfileButton() {
  return (
    <Link
      href="/profile"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
    >
      プロフィール編集
    </Link>
  );
}

export default async function Home() {
  const profiles = await prisma.profiles.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-900 text-white">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold">Lookbook</h1>
          {/* ボタンをまとめるためのdivを追加 */}
          <div className="flex items-center gap-4">
            <EditProfileButton /> {/* プロフィール編集ボタンを配置 */}
            <LogoutButton />      {/* ログアウトボタンを配置 */}
          </div>
        </div>
        
        {profiles.length > 0 ? (
          <ul className="space-y-4">
            {profiles.map((profile) => (
              // ✨【ここを修正】li全体をLinkコンポーネントで囲む
              <Link key={profile.id} href={`/profiles/${profile.public_id}`}>
                <li className="bg-gray-800 p-6 my-5 rounded-xl shadow-lg transition-transform hover:scale-105 hover:bg-gray-700 cursor-pointer">
                  <p className="text-2xl font-semibold text-cyan-400">{profile.name ?? '未設定'}</p>
                  <p className="text-gray-300 mt-1">Skill: {profile.skill ?? '未設定'}</p>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <div className="text-center bg-gray-800 p-8 rounded-xl">
            <p className="text-lg">まだプロフィールが登録されていません。</p>
          </div>
        )}
      </div>
    </main>
  );
}