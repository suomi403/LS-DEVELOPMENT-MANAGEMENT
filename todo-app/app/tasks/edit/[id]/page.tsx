import { getRequestContext } from '@cloudflare/next-on-pages';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

async function getTask(id: string) {
  const db = getRequestContext().env.DB;
  const task = await db
    .prepare("SELECT * FROM tasks WHERE task_id = ? AND delete_flag = 0")
    .bind(id)
    .first();
  return task;
}

export default async function EditTaskPage({ params }: { params: { id: string } }) {
  const task: any = await getTask(params.id);

  if (!task) {
    notFound(); // 404エラー（get_object_or_404の代わり）
  }

  return (
    <main>
      <h4>タスクの追加/編集</h4>
      <form action="/api/tasks" method="POST">
        <input type="hidden" name="task_id" value={task.task_id} />
        
        <div>
          <label>タスク名: </label>
          <input type="text" name="task_name" defaultValue={task.task_name} required />
        </div>
        
        <div>
          <label>タスク概要: </label>
          <textarea name="task_detail" defaultValue={task.task_detail || ''} />
        </div>
        
        <div>
          <label>期限: </label>
          <input type="date" name="deadline" defaultValue={task.deadline || ''} />
        </div>

        <br />
        <button type="submit">送信</button>
      </form>
      <br />
      <Link href="/tasks">戻る</Link>
    </main>
  );
}