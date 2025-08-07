import { PrismaClient } from '@prisma/client'

// PrismaClientのインスタンスを保持するグローバル変数を宣言
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

// prismaインスタンスが存在しない場合のみ新しく作成する
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // 開発中に実行されるクエリをログに出力する
  })

// 開発環境でのみ、グローバル変数にprismaインスタンスを格納
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma