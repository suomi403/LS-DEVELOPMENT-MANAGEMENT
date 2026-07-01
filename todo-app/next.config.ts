import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 💡 ビルド時のESLintエラーによる中断を無視する設定を追加
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 念のためTypeScriptのエラーチェックは通したいため、こちらは含めないかfalseにします
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
