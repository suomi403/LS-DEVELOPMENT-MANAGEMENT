import { getRequestContext } from "@cloudflare/next-on-pages";
import { notFound } from "next/navigation";

export const runtime = "edge";

// キャッシュを無効化し、常に最新のDB状態を反映させる
export const revalidate = 0;

interface EditPageProps {
  params: Promise<{ id: string }>;
}

// 💡 D1データベースから指定されたIDのタスク詳細を取得
async function getTask(id: string) {
  const { env } = getRequestContext();
  try {
    const task = await env.DB.prepare(
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
  // Next.js 15の仕様に従い、paramsをawaitしてURLのIDを取得
  const { id } = await params;

  // 編集対象のデータを取得
  const task: any = await getTask(id);

  // タスクが存在しない場合は404エラー画面を表示
  if (!task) {
    notFound();
  }

  return (
    <main style={{ padding: "20px" }}>
      <h2>タスクの編集 (ID: {id})</h2>

      {/* 💡 送信先を物理分割したAPIパスに変更 */}
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
