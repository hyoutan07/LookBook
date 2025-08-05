# LookBook

## コミットメッセージ
- feat: 新しい機能
- fix: バグの修正
- docs: ドキュメントのみの変更
- style: 空白、フォーマット、セミコロン追加など
- refactor: 仕様に影響がないコード改善(リファクタ)
- perf: パフォーマンス向上関連
- test: テスト関連
- chore: ビルド、補助ツール、ライブラリ関連

```
feat: 〇〇なため、△△を追加
```

## prismaコマンド早見表
| コマンド | 何をするか | 主な用途 |
| :--- | :--- | :--- |
| `npx prisma init` | Prismaの初期設定ファイルを作成する。 | プロジェクトの最初に1回だけ。 |
| `npx prisma generate` | schema.prismaを元に型安全なクライアントを生成・更新する。 | schema.prismaを編集したら必ず実行。 |
| `npx prisma migrate dev` | 【推奨】 DBの構造変更を履歴付きでDBに適用する。 | スキーマを変更し、DBに反映させたい時。（開発時の基本） |
| `npx prisma db push` | DBの構造変更を履歴なしでDBに適用する。（注意して使用） | すぐに試したいプロトタイピング中など。 |
| `npx prisma db pull` | 現在のDBの状態をschema.prismaに書き出す。 | SupabaseのGUI等でDBを直接変更した時に使用。 |
| `npx prisma studio` | ブラウザでDBを操作できるGUI（データベース管理画面）を起動する。 | データの確認や手動でのテストデータ作成に。 |