import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Cloudflare Pages Todo Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body style={{ display: "flex", minHeight: "100vh", margin: 0, backgroundColor: "#f3f4f6", fontFamily: "sans-serif" }}>
        {/* サイドバー */}
        <aside style={{
          width: "240px",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e5e7eb",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          flexShrink: 0
        }}>
          <h2 style={{ fontSize: "18px", margin: 0, fontWeight: "bold", color: "#111827" }}>
            📋 タスク管理
          </h2>
          <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Link href="/" style={{ color: "#4b5563", textDecoration: "none", fontSize: "14px", padding: "8px 12px", borderRadius: "6px", fontWeight: "bold" }}>
              🏠 ホーム
            </Link>
            <Link href="/tasks" style={{ color: "#4b5563", textDecoration: "none", fontSize: "14px", padding: "8px 12px", borderRadius: "6px", fontWeight: "bold" }}>
              📋 タスク一覧
            </Link>
            <Link href="/tasks/create" style={{ color: "#4b5563", textDecoration: "none", fontSize: "14px", padding: "8px 12px", borderRadius: "6px", fontWeight: "bold" }}>
              ➕ 新しいタスクを追加
            </Link>
            <Link href="/tasks/completed" style={{ color: "#4b5563", textDecoration: "none", fontSize: "14px", padding: "8px 12px", borderRadius: "6px", fontWeight: "bold" }}>
              ✅ 完了済みのタスク
            </Link>
          </nav>
        </aside>

        {/* メインコンテンツ */}
        <main style={{ flex: 1, padding: "40px", display: "flex", flexDirection: "column", overflowY: "auto" }}>
          <div style={{
            maxWidth: "800px",
            width: "100%",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            border: "1px solid #e5e7eb"
          }}>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
