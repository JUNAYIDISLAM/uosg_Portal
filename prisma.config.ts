import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Migrations need a direct (non-pooled) connection. Vercel's Neon integration
    // provides it as DATABASE_URL_UNPOOLED; locally DATABASE_URL is enough.
    url: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL,
    shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
  },
});
