import Link from "next/link";

export default function CreateTaskPage() {
  return (
    <div>
      <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}>タスクの追加</h2>
      <form
        action="/api/tasks/create"
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
            required
            style={{ width: "100%", boxSizing: "border-box" }}
            placeholder="タスク名を入力"
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px", color: "#374151" }}>
            タスク概要:
          </label>
          <textarea
            name="task_detail"
            rows={4}
            style={{ width: "100%", boxSizing: "border-box" }}
            placeholder="タスクの詳細を入力"
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px", color: "#374151" }}>
            期限:
          </label>
          <input
            type="date"
            name="deadline"
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button type="submit">送信</button>
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
