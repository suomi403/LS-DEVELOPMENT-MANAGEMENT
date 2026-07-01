import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 0;

interface EditPageProps {
  params: Promise<{ id: string }>;
}

// 💡 process.env を使用するように修正
async function getTask(id: string) {
  try {
    const db = (process.env as any).DB;
    if (!db) throw new Error("Database binding 'DB' is not available.");

    const task = await db
      .prepare(
        "SELECT task_id, task_name, task_detail, deadline FROM tasks WHERE task_id = ?",
      )
      .bind(id)
      .first();

    return task;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const match = dateStr.match(/^\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : "";
}

export default async function EditTaskPage({ params }: EditPageProps) {
  const { id } = await params;
  const task: any = await getTask(id);

  if (!task) {
    notFound();
  }

  return (
    <div>
      <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}>タスクの編集 (ID: {id})</h2>
      <form
        action={`/api/tasks/edit/${id}`}
        method="POST"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "400px",
        }}
      >
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px", color: "#374151" }}>
            タスク名:
          </label>
          <input
            type="text"
            name="task_name"
            defaultValue={task.task_name}
            required
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px", color: "#374151" }}>
            タスク概要:
          </label>
          <textarea
            name="task_detail"
            defaultValue={task.task_detail}
            rows={4}
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px", color: "#374151" }}>
            期限:
          </label>
          <input
            type="date"
            name="deadline"
            defaultValue={formatDate(task.deadline)}
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button type="submit">更新</button>
          <Link
            href="/tasks"
            style={{
              display: "inline-block",
              padding: "8px 16px",
              backgroundColor: "#f3f4f6",
              color: "#4b5563",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "bold",
              border: "1px solid #d1d5db",
              textAlign: "center"
            }}
          >
            戻る
          </Link>
        </div>
      </form>
    </div>
  );
}
