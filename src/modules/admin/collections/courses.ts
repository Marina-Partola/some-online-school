import type { CollectionConfig, FieldHookArgs } from "payload";
import { Course } from "../payload.types";

export const Courses: CollectionConfig = {
  slug: "courses",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "duration",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "level",
      type: "select",
      required: true,
      localized: true,
      options: [
        { label: "Beginner", value: "beginner" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Upper-intermediate", value: "upper-intermediate" },
      ],
    },
    {
      name: "topics",
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
      name: "instructor",
      required: true,
      type: "relationship",
      relationTo: "instructors",
    },
    {
      name: "titleWithId",
      type: "text",
      hooks: {
        afterRead: [
          ({ data }: FieldHookArgs<Course>) => {
            if (!data) {
              return "";
            }

            return `${data.id} ${data.title}`;
          },
        ],
      },
      admin: {
        hidden: true,
      },
    },
  ],

  admin: {
    useAsTitle: "titleWithId",
  },

  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (!doc.instructor) return;

        const instructorId =
          typeof doc.instructor === "string"
            ? doc.instructor
            : doc.instructor?.id;

        if (!instructorId) {
          console.error("Instructor ID is missing or invalid:", doc.instructor);
          return;
        }

        // Получаем инструктора из базы данных
        const instructor = await req.payload.findByID({
          collection: "instructors",
          id: instructorId,
        });

        if (!instructor) {
          console.error("Instructor not found:", instructorId);
          return;
        }

        console.log("Instructor found:", instructor);

        // Проверяем, есть ли уже курс у инструктора
        const existingCourses = Array.isArray(instructor.courses)
          ? instructor.courses.map((course) =>
              typeof course === "number" ? course : course?.id
            )
          : [];

        if (!existingCourses.includes(doc.id)) {
          await req.payload.update({
            collection: "instructors",
            id: instructorId,
            data: {
              courses: [...existingCourses, doc.id],
            },
          });
          console.log(`Course ${doc.id} added to instructor ${instructorId}`);
        }
      },
    ],
  },
};
