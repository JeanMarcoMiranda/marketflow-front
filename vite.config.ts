import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	server: {
		host: "0.0.0.0",
		port: 5173,
		proxy: {
			'/api': "https://marketflow-api-hmkc.onrender.com/api/"
		}
	},
	base: "./",
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
