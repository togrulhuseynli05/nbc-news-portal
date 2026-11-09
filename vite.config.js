import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createNewsApiMiddleware } from "./server/newsApi.js";

// Adında VITE_ prefiksi olmadığı üçün açar brauzer kodunun içinə düşmür.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "./nbc-news-portal/",
    plugins: [
      react(),
      {
        name: "news-api-middleware",
        configureServer(server) {
          server.middlewares.use(createNewsApiMiddleware(env.NEWS_API_KEY));
        },
      },
    ],
  };
});
