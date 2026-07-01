export const runtime = "edge";

export default function CreateTaskPage() {
  return (
    <main style={{ padding: "20px" }}>
      <h2>タスクの追加</h2>
      <form
        action="/api/tasks/create"
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
            required
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label style={{ display: "block" }}>タスク概要:</label>
          <textarea name="task_detail" style={{ width: "100%" }} />
        </div>
        <div>
          <label style={{ display: "block" }}>期限:</label>
          <input type="date" name="deadline" style={{ width: "100%" }} />
        </div>
        <button type="submit" style={{ marginTop: "10px", cursor: "pointer" }}>
          送信
        </button>
      </form>
    </main>
  );
}
