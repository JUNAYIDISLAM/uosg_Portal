// Applies pending database migrations during `npm run build` (e.g. on Vercel).
// Skipped when no database is configured, so the public site can still build.
import { execSync } from "node:child_process";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  console.warn("[migrate] DATABASE_URL is not set — skipping database migrations.");
} else {
  execSync("prisma migrate deploy", { stdio: "inherit" });
}
