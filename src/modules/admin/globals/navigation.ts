import { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  fields: [
    {
      name: "links",
      type: "array",
      localized: true,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "reference",
          type: "relationship",
          label: "Document to link to",
          relationTo: ["pages"],
        },
      ],
    },
  ],
};
