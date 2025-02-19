import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
  slug: "teamMembers",
  fields: [
    {
      name: "name",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "role",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      required: true,
    },

    {
      name: "bio",
      type: "text",
      localized: true,
      required: true,
    },
  ],
};
