import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const task_name = formData.get("task_name");
    const task_detail = formData.get("task_detail") || "";
    const deadline = formData.get("deadline") || null;

    if (!task_name) {
      return NextResponse.json({ error: "タスク名は必須です" }, { status: 400 });
    }

    // 💡 OpenNext環境では process.env から直接バインディング（DB）にアクセスします
    const db = (process.env as any).DB;

    if (!db) {
      throw new Error(
        "D1データベースバインディング 'DB' が見つかりません。 [本番環境の場合] Cloudflare Pagesダッシュボードの Settings -> Functions -> D1 database bindings にて Variable name = 'DB', Database = 'tasks' の設定を行ってください。[ローカル開発の場合] Wrangler を使用してローカル環境を起動してください (例: npx wrangler pages dev)"
      );
    }

    // D1データベースへの挿入処理を実行
    await db
      .prepare(
        "INSERT INTO tasks (task_name, task_detail, deadline, complete_flag) VALUES (?, ?, ?, 0)",
      )
      .bind(task_name, task_detail, deadline)
      .run();

    // 登録完了後、タスク一覧ページへリダイレクト
    return NextResponse.redirect(new URL("/tasks", request.url), 303);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        error: "データベース登録に失敗しました",
        details: error?.message || String(error),
      },
      { status: 500 },
    );
  }
}
