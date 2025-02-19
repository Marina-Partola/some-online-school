import type { CollectionConfig, FieldHookArgs } from "payload";
import { Instructor } from "../payload.types";

export const Instructors: CollectionConfig = {
  slug: "instructors",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "bio",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "expertise",
      type: "array",
      required: true,
      localized: true,
      fields: [
        {
          name: "title",
          type: "text",
        },
      ],
    },
    {
      name: "courses",
      type: "relationship",
      relationTo: "courses",
      hasMany: true,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "nameWithId",
      type: "text",
      hooks: {
        afterRead: [
          ({ data }: FieldHookArgs<Instructor>) => {
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
