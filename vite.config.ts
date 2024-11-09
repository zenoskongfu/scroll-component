import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: "src/components.d.ts",
      imports: ["vue"],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: "src/auto-imports.d.ts",
    }),
  ],
});
