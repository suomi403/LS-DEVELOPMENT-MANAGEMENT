export const runtime = "edge";

interface EditPageProps {
  params: Promise<{ id: string }>; // 💡Next.js 15ではPromiseで受け取る必要があります
}

export default async function EditTaskPage({ params }: EditPageProps) {
  // paramsをawaitしてURLのIDを取得
  const { id } = await params;

  return (
    <main style={{ padding: "20px" }}>
      <h2>タスクの編集 (ID: {id})</h2>
      {/* 💡送信先は新しく移動させた api 配下のURLを指定 */}
      <form action={`/api/tasks/edit/${id}`} method="POST">
        <div>
          <label>タスク名:</label>
          <input type="text" name="task_name" required />
        </div>
        <button type="submit">更新</button>
      </form>
    </main>
  );
}
