// import react from "@vitejs/plugin-react";
// import path from "path";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       react: path.resolve("./node_modules/react"),
//       "react-dom": path.resolve("./node_modules/react-dom"),
//       "styled-components": path.resolve("./node_modules/styled-components"),
//     },
//   },
// });

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
});
