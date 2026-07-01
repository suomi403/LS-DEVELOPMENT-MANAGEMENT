import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteProps) {
  try {
    // Next.js 15の仕様に伴い、paramsをawaitしてURLのIDを取得
    const { id } = await params;

    const formData = await request.formData();
    const task_name = formData.get("task_name");
    const task_detail = formData.get("task_detail");
    const deadline = formData.get("deadline");

    const { env } = getRequestContext();

    // D1 データベースの更新処理を実行
    await env.DB.prepare(
      "UPDATE tasks SET task_name = ?, task_detail = ?, deadline = ? WHERE task_id = ?",
    )
      .bind(task_name, task_detail, deadline, id)
      .run();

    // 更新完了後、タスク一覧ページへリダイレクト
    return NextResponse.redirect(new URL("/tasks", request.url), 303);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}
