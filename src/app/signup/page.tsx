'use client' // ユーザー操作があるので、Client Componentにする

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client' // client用のSupabaseインスタンスをインポート
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // フォームのデフォルトの送信動作を防ぐ

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert('エラーが発生しました: ' + error.message)
    } else {
      alert('登録ありがとうございます！確認メールを送信しました。')
      // 必要に応じてログインページなどにリダイレクト
      router.push('/')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSignUp}
        >
          <h1 className="text-2xl text-center text-gray-800 mb-6">サインアップ</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              メールアドレス
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              パスワード
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              登録する
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}