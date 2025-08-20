import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function ProfilePage() {
  const supabase = await createClient();

  // 1. ログインしているユーザー情報を取得
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2. もしユーザーがいなければ、ログインページにリダイレクト
  if (!user) {
    return redirect('/login');
  }

  // 3. ユーザーIDを元に、profilesテーブルから該当プロフィールを取得
  const profile = await prisma.profiles.findUnique({
    where: {
      user_id: user.id,
    },
  });

  // 4. Server Actionを定義（フォームが送信された時に実行されるサーバー側の処理）
  async function updateProfile(formData: FormData) {
    'use server'; // これがServer Actionであることの宣言

    // フォームから送信されたデータを取得
    const name = formData.get('name') as string;
    const skill = formData.get('skill') as string;

    // ユーザーIDを再度取得（セキュリティのため）
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect('/login');
    }

    // Prismaを使ってデータベースを更新
    await prisma.profiles.update({
      where: {
        user_id: user.id,
      },
      data: {
        name,
        skill,
      },
    });

    // プロフィールページを再検証して、表示を最新の状態に更新
    revalidatePath('/profile');
    
    // ホームページにリダイレクト
    redirect('/');
  }

  // 5. フォームを含むUIをレンダリング
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl text-center text-gray-800 mb-6">プロフィール登録・編集</h1>
          
          {/* Server Actionをフォームに紐付け */}
          <form action={updateProfile}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                メールアドレス
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 bg-gray-200 leading-tight focus:outline-none"
                id="email"
                type="email"
                value={profile?.email ?? ''}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                名前
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name" // name属性が重要
                type="text"
                placeholder="山田 太郎"
                defaultValue={profile?.name ?? ''}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skill">
                スキル
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="skill"
                name="skill" // name属性が重要
                type="text"
                placeholder="Next.js, TypeScript"
                defaultValue={profile?.skill ?? ''}
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                更新する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}