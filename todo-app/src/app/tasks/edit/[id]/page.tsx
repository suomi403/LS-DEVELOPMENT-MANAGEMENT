import { notFound } from "next/navigation";

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

export default async function EditTaskPage({ params }: EditPageProps) {
  const { id } = await params;
  const task: any = await getTask(id);

  if (!task) {
    notFound();
  }

  return (
    <main style={{ padding: "20px" }}>
      <h2>タスクの編集 (ID: {id})</h2>
      <form
        action={`/api/tasks/edit/${id}`}
        method="POST"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "300px",
        }}
      >
        <div>
          <label style={{ display: "block" }}>タスク名:</label>
          <input
            type="text"
            name="task_name"
            defaultValue={task.task_name}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label style={{ display: "block" }}>タスク概要:</label>
          <textarea
            name="task_detail"
            defaultValue={task.task_detail}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label style={{ display: "block" }}>期限:</label>
          <input
            type="date"
            name="deadline"
            defaultValue={task.deadline}
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit" style={{ marginTop: "10px", cursor: "pointer" }}>
          更新
        </button>
      </form>
    </main>
  );
}
