import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server' // server用のクライアントをインポート
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


export default async function Home() {
  const profiles = await prisma.profiles.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-900 text-white">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold">Lookbook</h1>
          <LogoutButton /> {/* ログアウトボタンを配置 */}
        </div>
        
        {profiles.length > 0 ? (
          <ul className="space-y-4">
            {profiles.map((profile) => (
              <li key={profile.id} className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <p className="text-2xl font-semibold text-cyan-400">{profile.name ?? '未設定'}</p>
                <p className="text-gray-300 mt-1">Skill: {profile.skill ?? '未設定'}</p>
              </li>
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