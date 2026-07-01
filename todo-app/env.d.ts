/// <reference types="@cloudflare/next-on-pages" />

interface CloudflareEnv {
  // wrangler.json で設定したDB名と型をここに定義します
  DB: D1Database;
}
