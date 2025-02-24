import type { Block } from "payload";

export const ListBlockConfig: Block = {
  slug: "ListBlock",
  imageURL: "/blocks/list-block.png",
  fields: [
    {
      name: "items",
      type: "array",
      localized: true,
      required: true,
      fields: [
        {
          name: "text",
          type: "text",
        },
      ],
    },
  ],
};
