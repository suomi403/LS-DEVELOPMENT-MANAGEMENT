import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const task_name = formData.get("task_name");
    const task_detail = formData.get("task_detail");
    const deadline = formData.get("deadline");

    // CloudflareのコンテキストからDBバインディングを取得
    const { env } = getRequestContext();

    // D1データベースへの挿入処理を実行（is_completed の初期値 0 を明示的に指定）
    await env.DB.prepare(
      "INSERT INTO tasks (task_name, task_detail, deadline, is_completed) VALUES (?, ?, ?, 0)",
    )
      .bind(task_name, task_detail, deadline)
      .run();

    // 登録完了後、タスク一覧ページ（/tasks）へリダイレクト
    return NextResponse.redirect(new URL("/tasks", request.url), 303);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "データベース登録に失敗しました" },
      { status: 500 },
    );
  }
}
