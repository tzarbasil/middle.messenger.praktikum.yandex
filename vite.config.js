import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  plugins: [handlebars()],
  assetsInclude: ["**/*.hbs"],
  build: {
    port: 3000,
  },

  preview: {
    port: 3000,
  },
});
