import type { Block } from "payload";
import { TextBlockConfig } from "../TextBlock/config";
import { ListBlockConfig } from "../ListBlock/config";

export const CardBlockConfig: Block = {
  slug: "Card",
  imageURL: "/blocks/card-block.png",
  fields: [
    {
      name: "title",
      required: true,
      localized: true,
      type: "text",
    },
    {
      name: "layout",
      required: true,
      type: "blocks",
      blocks: [TextBlockConfig, ListBlockConfig],
    },
  ],
};
