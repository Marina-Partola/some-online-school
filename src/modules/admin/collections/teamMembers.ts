import type { CollectionConfig, FieldHookArgs } from "payload";
import { TeamMember } from "../payload.types";

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
    {
      name: "nameWithId",
      type: "text",
      hooks: {
        afterRead: [
          ({ data }: FieldHookArgs<TeamMember>) => {
            if (!data) {
              return "";
            }

            return `${data.id} ${data.name}`;
          },
        ],
      },
      admin: {
        hidden: true,
      },
    },
  ],
  admin: {
    useAsTitle: "nameWithId",
  },
};
