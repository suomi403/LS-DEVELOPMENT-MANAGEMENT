import Link from "next/link";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// キャッシュを無効化し、常に最新のDB状態を反映させる
export const revalidate = 0;

async function getCompletedTasks() {
  const db = getRequestContext().env.DB;
  try {
    const { results } = await db
      .prepare(
        "SELECT * FROM tasks WHERE is_completed = 1 ORDER BY complete_date DESC",
      )
      .all();
    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function CompletedTaskList() {
  const tasks = await getCompletedTasks();

  return (
    <main style={{ padding: "20px" }}>
      <h1>完了済みタスク</h1>
      <table
        border={1}
        style={{ borderCollapse: "collapse", width: "100%", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th>タスクID</th>
            <th>タスク名</th>
            <th>タスク概要</th>
            <th>期限</th>
            <th>作成日</th>
            <th>完了日</th>
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
              <td>{task.create_date}</td>
              <td>{task.complete_date}</td>
              <td>
                <Link href={`/tasks/edit/${task.task_id}`}>修正</Link>
                {" | "}
                {/* 💡 送信先を api/ 配下の正しいパスに指定 */}
                <form
                  action="/api/tasks/delete"
                  method="POST"
                  style={{ display: "inline" }}
                >
                  <input type="hidden" name="task_id" value={task.task_id} />
                  <button
                    type="submit"
                    onSubmit={(e) => {
                      if (!confirm("削除しますか？")) {
                        e.preventDefault();
                      }
                    }}
                  >
                    削除
                  </button>
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
