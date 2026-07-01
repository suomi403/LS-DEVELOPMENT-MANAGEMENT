import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// タスクの作成 (create_taskのPOST) と 編集 (edit_taskのPOST)
export async function POST(request: NextRequest) {
  const db = getRequestContext().env.DB;
  const formData = await request.formData();
  
  const taskId = formData.get('task_id');
  const taskName = formData.get('task_name') as string;
  const taskDetail = formData.get('task_detail') as string;
  const deadline = formData.get('deadline') as string;

  // バリデーション（簡単なチェック）
  if (!taskName) {
    return new Response('タスク名は必須です', { status: 400 });
  }

  if (taskId) {
    // 編集 (edit_task)
    await db.prepare(
      "UPDATE tasks SET task_name = ?, task_detail = ?, deadline = ? WHERE task_id = ?"
    )
    .bind(taskName, taskDetail, deadline, taskId)
    .run();
  } else {
    // 新規作成 (create_task)
    await db.prepare(
      "INSERT INTO tasks (task_name, task_detail, deadline) VALUES (?, ?, ?)"
    )
    .bind(taskName, taskDetail, deadline)
    .run();
  }

  // 一覧画面へリダイレクト
  return Response.redirect(new URL('/tasks', request.url), 303);
}

// 完了・削除などのステータス更新用（クエリパラメータで制御する例）
export async function PATCH(request: NextRequest) {
  const db = getRequestContext().env.DB;
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get('task_id');
  const action = searchParams.get('action'); // 'complete' または 'delete'

  if (!taskId) return new Response('IDが必要です', { status: 400 });

  if (action === 'complete') {
    // complete_task のロジック
    const now = new Date().toISOString();
    await db.prepare("UPDATE tasks SET is_completed = 1, complete_date = ? WHERE task_id = ?")
      .bind(now, taskId)
      .run();
  } else if (action === 'delete') {
    // delete_task のロジック（論理削除にする場合。D1側でdelete_flagカラムを作るか、物理削除にするか選べます）
    await db.prepare("DELETE FROM tasks WHERE task_id = ?")
      .bind(taskId)
      .run();
  }

  return Response.json({ success: true });
}