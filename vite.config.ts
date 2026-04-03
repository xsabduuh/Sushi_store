import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // إذا رفعت على GitHub Pages في مستودع اسمه "sakura-sushi"، غير "/" إلى "/sakura-sushi/"
  base: "/Sushi_store/",
});
