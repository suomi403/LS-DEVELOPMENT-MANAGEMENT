import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const task_id = formData.get("task_id");

    if (!task_id) {
      return NextResponse.json({ error: "タスクIDが指定されていません" }, { status: 400 });
    }

    const db = (process.env as any).DB;
    if (!db) {
      throw new Error("Database binding 'DB' is not available.");
    }

    // 論理削除を実行
    await db
      .prepare("UPDATE tasks SET delete_flag = 1 WHERE task_id = ?")
      .bind(task_id)
      .run();

    // 削除完了後、リダイレクト
    const referer = request.headers.get("referer");
    const redirectUrl = referer ? new URL(referer).pathname : "/tasks";
    return NextResponse.redirect(new URL(redirectUrl, request.url), 303);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "削除処理に失敗しました" }, { status: 500 });
  }
}
