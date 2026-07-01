import Link from "next/link";

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
        "SELECT task_id, task_name, task_detail, deadline FROM tasks WHERE delete_flag = 0 ORDER BY deadline ASC",
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
    <div>
      <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}>タスク一覧</h2>
      <Link
        href="/tasks/create"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#10b981",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          marginBottom: "20px"
        }}
      >
        ➕ 新しいタスクを追加
      </Link>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
        {tasks.map((task: any) => (
          <li
            key={task.task_id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "20px",
              backgroundColor: "#f9fafb",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <strong style={{ fontSize: "18px", color: "#111827" }}>{task.task_name}</strong>
              {task.deadline && (
                <span style={{ fontSize: "12px", color: "#ef4444", backgroundColor: "#fee2e2", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold" }}>
                  期限: {task.deadline}
                </span>
              )}
            </div>
            <p style={{ color: "#4b5563", fontSize: "14px", margin: "10px 0" }}>{task.task_detail}</p>
            <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
              <Link
                href={`/tasks/edit/${task.task_id}`}
                style={{
                  fontSize: "14px",
                  color: "#0070f3",
                  textDecoration: "none",
                  fontWeight: "bold"
                }}
              >
                ✏️ 編集する
              </Link>
            </div>
          </li>
        ))}
        {tasks.length === 0 && (
          <p style={{ color: "#666" }}>登録されているタスクはありません。</p>
        )}
      </ul>
    </div>
  );
}
