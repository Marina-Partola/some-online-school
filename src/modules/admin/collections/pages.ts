import type { CollectionConfig, FieldHookArgs } from "payload";
import { Page } from "../payload.types";
import { CardBlockConfig } from "@/blocks/CardBlock/config";
import { PersonCardBlockConfig } from "@/blocks/PersonCardBlock/config";
import { GalleryBlockConfig } from "@/blocks/GalleryBlock/config";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    preview: ({ slug }, { locale }) =>
      `http://localhost:3000/${locale}/${slug}`,
    useAsTitle: "titleWithId",
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      validate: (value: string | null | undefined) =>
        value?.startsWith("/") ? true : "URL должен начинаться с '/'",
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "layout",
      type: "blocks",
      blocks: [CardBlockConfig, PersonCardBlockConfig, GalleryBlockConfig],
    },
    {
      name: "titleWithId",
      type: "text",
      hooks: {
        afterRead: [
          ({ data }: FieldHookArgs<Page>) => {
            if (!data) {
              return "";
            }

            return `${data.id} ${data.title}`;
          },
        ],
      },
      admin: {
        hidden: true,
      },
    },
  ],
};
