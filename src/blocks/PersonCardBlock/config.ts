import type { Block } from "payload";

export const PersonCardBlockConfig: Block = {
  slug: "PersonCardBlock",
  imageURL: "/blocks/person-card-block.png",
  fields: [
    {
      name: "reference",
      type: "relationship",
      relationTo: ["teamMembers"],
      hasMany: true,
    },
  ],
};
