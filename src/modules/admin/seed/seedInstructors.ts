import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BasePayload } from "payload";

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

export const seedInstructors = async (payload: BasePayload) => {
  const instructors = await payload.find({
    collection: "instructors",
  });

  if (instructors.docs.length === 0) {
    const avatars = await Promise.all([
      payload.create({
        collection: "media",
        filePath: resolve(__dirname, "../stub/instructors/avatar1.jpeg"),
        data: { alt: "avatar1" },
      }),
      payload.create({
        collection: "media",
        filePath: resolve(__dirname, "../stub/instructors/avatar2.jpeg"),
        data: { alt: "avatar2" },
      }),
    ]);

    const instructors = [
      {
        name: {
          ru: "Иван Иванов",
          en: "Ivan Ivanov",
        },
        bio: {
          ru: "Опытный разработчик React и преподаватель с 10-летним стажем.",
          en: "Experienced React developer and educator with 10 years in the field.",
        },
        expertise: [
          { title: "React" },
          { title: "JavaScript" },
          { title: "Web Development" },
        ],
        avatar: avatars[0].id,
      },
      {
        name: {
          ru: "Мария Смирнова",
          en: "Maria Smirnova",
        },
        bio: {
          en: "Full-stack developer specializing in JavaScript and Node.js.",
          ru: "Full-stack разработчик, специализирующийся на JavaScript и Node.js.",
        },
        expertise: [
          { title: "JavaScript" },
          { title: "Node.js" },
          { title: "Express" },
        ],
        avatar: avatars[1].id,
      },
    ];

    for (const instructor of instructors) {
      const createdInstructor = await payload.create({
        collection: "instructors",
        locale: "ru",
        data: {
          name: instructor.name.ru,
          avatar: instructor.avatar,
          bio: instructor.bio.ru,
          expertise: instructor.expertise,
        },
      });

      await payload.update({
        collection: "instructors",
        id: createdInstructor.id,
        fallbackLocale: "ru",
        locale: "en",
        data: {
          name: instructor.name.en,
          bio: instructor.bio.en,
          expertise: instructor.expertise,
        },
      });
    }
  }
};
