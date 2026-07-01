import Link from "next/link";

export const runtime = "edge";

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        minHeight: "100vh",
        padding: "40px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <main
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "10px", color: "#333" }}>
          Todo アプリケーション
        </h1>
        <p style={{ color: "#666", marginBottom: "30px" }}>
          Cloudflare Workers ＆ Next.js 15 で動作するタスク管理システムです。
        </p>

        <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link
            href="/tasks"
            style={{
              display: "block",
              padding: "15px",
              backgroundColor: "#0070f3",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            📋 タスク一覧を見る
          </Link>

          <Link
            href="/tasks/create"
            style={{
              display: "block",
              padding: "15px",
              backgroundColor: "#10b981",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            ➕ 新しいタスクを追加する
          </Link>

          <Link
            href="/tasks/completed"
            style={{
              display: "block",
              padding: "15px",
              backgroundColor: "#6b7280",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            ✅ 完了済みのタスクを確認する
          </Link>
        </nav>
      </main>
    </div>
  );
}
