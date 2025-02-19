import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { buildConfig } from "payload";
import { Courses } from "./collections/courses";
import { Instructors } from "./collections/instructors";
import { Media } from "./collections/media";
import { TeamMembers } from "./collections/teamMembers";
import { seed } from "./seed";

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Courses, Instructors, Media, TeamMembers],
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
  onInit: seed,
});
