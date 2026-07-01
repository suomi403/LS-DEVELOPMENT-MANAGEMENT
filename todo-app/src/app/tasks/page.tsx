import Link from "next/link";

export const runtime = "edge";

// キャッシュを無効化し、毎回最新のDBデータを取得する設定
export const revalidate = 0;

async function getTasks() {
  try {
    // 💡 OpenNext環境では process.env から直接バインディング（DB）にアクセスします
    const db = (process.env as any).DB;

    if (!db) {
      throw new Error("Database binding 'DB' is not available.");
    }

    // D1 データベースからタスク一覧を取得するSQL文を実行
    const { results } = await db
      .prepare(
        "SELECT task_id, task_name, task_detail, deadline FROM tasks ORDER BY deadline ASC",
      )
      .all();
    return results;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <main style={{ padding: "20px" }}>
      <h2>タスク一覧</h2>
      <Link href="/tasks/create">➕ 新しいタスクを追加</Link>

      <ul style={{ marginTop: "20px" }}>
        {tasks.map((task: any) => (
          <li
            key={task.task_id}
            style={{
              marginBottom: "15px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "10px",
            }}
          >
            <strong>{task.task_name}</strong> (期限: {task.deadline})
            <p>{task.task_detail}</p>
            {/* 💡 編集画面へのリンク */}
            <Link
              href={`/tasks/edit/${task.task_id}`}
              style={{ fontSize: "14px", color: "#0070f3" }}
            >
              ✏️ 編集する
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
