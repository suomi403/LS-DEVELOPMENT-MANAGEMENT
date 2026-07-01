import Link from 'next/link';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

async function getPendingTasks() {
  const db = getRequestContext().env.DB;
  const { results } = await db
    .prepare("SELECT * FROM tasks WHERE is_completed = 0 ORDER BY deadline ASC")
    .all();
  return results;
}

export default async function TaskList() {
  const tasks = await getPendingTasks();

  return (
    <main>
      <h1>タスク一覧</h1>
      <table>
        <thead>
          <tr>
            <th>タスクID</th>
            <th>タスク名</th>
            <th>タスク概要</th>
            <th>期限</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: any) => (
            <tr key={task.task_id}>
              <th>{task.task_id}</th>
              <td>{task.task_name}</td>
              <td>{task.task_detail}</td>
              <td>{task.deadline}</td>
              <td>
                <Link href={`/tasks/edit/${task.task_id}`}>修正</Link>
                {" | "}
                {/* 完了処理はAPIエンドポイントを叩くか、Server Actions等で実装します */}
                <form action={`/api/tasks/complete`} method="POST" style={{ display: 'inline' }}>
                  <input type="hidden" name="task_id" value={task.task_id} />
                  <button type="submit">完了</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Link href="/tasks/create">作成</Link>
    </main>
  );
}