import type { Block } from "payload";

import { PersonCardBlockConfig } from "../PersonCardBlock/config";

export const GalleryBlockConfig: Block = {
  slug: "GalleryBlock",
  imageURL: "/blocks/gallery-block.png",
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
    },
    {
      name: "layout",
      type: "blocks",
      blocks: [PersonCardBlockConfig],
    },
  ],
};
