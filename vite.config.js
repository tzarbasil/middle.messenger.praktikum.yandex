import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  plugins: [handlebars()],
  assetsInclude: ["**/*.hbs"],
  server: {
    port: 3000,
  },
});
