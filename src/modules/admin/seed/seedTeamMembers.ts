import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BasePayload } from "payload";

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

export const seedTeamMembers = async (payload: BasePayload) => {
  const teamMembers = await payload.find({
    collection: "teamMembers",
  });

  if (teamMembers.docs.length === 0) {
    const avatars = await Promise.all([
      payload.create({
        collection: "media",
        filePath: resolve(__dirname, "../stub/teamMembers/avatar1.png"),
        data: { alt: "avatar1" },
      }),
      payload.create({
        collection: "media",
        filePath: resolve(__dirname, "../stub/teamMembers/avatar2.webp"),
        data: { alt: "avatar2" },
      }),
      payload.create({
        collection: "media",
        filePath: resolve(__dirname, "../stub/teamMembers/avatar3.jpeg"),
        data: { alt: "avatar3" },
      }),
    ]);

    const members = [
      {
        name: {
          ru: "Анна Смирнова",
          en: "Anna Smirnova",
        },
        avatar: avatars[0].id,
        role: {
          ru: "Основатель и ведущий преподаватель",
          en: "Founder and Lead Instructor",
        },
        bio: {
          ru: "Имея более 15 лет опыта в сфере онлайн-образования, Др. Смирнова стремится сделать обучение доступным для всех.",
          en: "With over 15 years of experience in online education, Dr. Smirnova strives to make learning accessible to everyone.",
        },
      },
      {
        name: {
          ru: "Иван Петров",
          en: "Ivan Petrov",
        },
        avatar: avatars[1].id,
        role: {
          ru: "Руководитель учебного отдела",
          en: "Head of Academic Department",
        },
        bio: {
          ru: "Профессор Петров разрабатывает учебные программы, чтобы наши курсы соответствовали самым высоким академическим стандартам.",
          en: "Professor Petrov designs curricula to ensure our courses meet the highest academic standards.",
        },
      },
      {
        name: {
          ru: "Екатерина Иванова",
          en: "Ekaterina Ivanova",
        },
        avatar: avatars[2].id,
        role: {
          ru: "Координатор по работе со студентами",
          en: "Student Support Coordinator",
        },
        bio: {
          ru: "Екатерина помогает студентам на каждом этапе их обучения, поддерживая их в достижении лучших результатов.",
          en: "Ekaterina supports students at every stage of their education, helping them achieve their best results.",
        },
      },
    ];

    for (const member of members) {
      const createdMember = await payload.create({
        collection: "teamMembers",
        locale: "ru",
        data: {
          name: member.name.ru,
          avatar: member.avatar,
          role: member.role.ru,
          bio: member.bio.ru,
        },
      });

      await payload.update({
        collection: "teamMembers",
        id: createdMember.id,
        locale: "en",
        data: {
          name: member.name.en,
          role: member.role.en,
          bio: member.bio.en,
        },
      });
    }
  }
};
