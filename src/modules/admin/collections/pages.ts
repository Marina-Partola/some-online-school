import type { CollectionConfig, FieldHookArgs } from "payload";
import { Page } from "../payload.types";
import { CardBlockConfig } from "@/blocks/CardBlock/config";
import { PersonCardBlockConfig } from "@/blocks/PersonCardBlock/config";
import { GalleryBlockConfig } from "@/blocks/GalleryBlock/config";
import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    preview: ({ slug }, { locale }) =>
      `http://localhost:3000/${locale}/${slug}`,
    useAsTitle: "titleWithId",
  },
  versions: {},
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
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              localized: true,
            },
            {
              name: "layout",
              type: "blocks",
              blocks: [
                CardBlockConfig,
                PersonCardBlockConfig,
                GalleryBlockConfig,
              ],
            },
            {
              name: "content",
              type: "richText",
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  FixedToolbarFeature(),
                ],
              }),
            },
          ],
          name: "mainContent",
          label: "Main Content",
        },
        {
          fields: [
            {
              name: "title",
              required: true,
              type: "text",
              localized: true,
            },
            {
              name: "description",
              required: true,
              type: "text",
              localized: true,
            },
          ],
          name: "seo",
          label: "SEO",
        },
      ],
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

            return `${data.id} ${data.mainContent?.title}`;
          },
        ],
      },
      admin: {
        hidden: true,
      },
    },
  ],
};
