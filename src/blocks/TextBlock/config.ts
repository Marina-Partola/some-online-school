import type { Block } from "payload";

export const TextBlockConfig: Block = {
  slug: "TextBlock",
  imageURL: "/blocks/text-block.png",
  fields: [
    {
      type: "text",
      name: "text",
      required: true,
      localized: true,
    },
  ],
};
