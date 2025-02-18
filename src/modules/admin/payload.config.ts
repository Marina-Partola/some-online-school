import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { buildConfig } from "payload";

export default buildConfig({
  editor: lexicalEditor(),
  collections: [],
  secret: process.env.PAYLOAD_SECRET || "",
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI ?? "",
    },
  }),
  sharp,
  localization: {
    locales: ["ru", "en"],
    defaultLocale: "en",
  },
  typescript: {
    outputFile: "./src/modules/admin/payload.types.ts",
  },
});
