import { QuoteBlock } from "@/blocks/Quote/config";
import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      defaultValue: "/test",
      localized: true,
      validate: (value: string | null | undefined) =>
        value?.startsWith("/") ? true : "URL должен начинаться с '/'",
    },
    {
      name: "layout",
      type: "blocks",
      blocks: [QuoteBlock],
    },
  ],
};
