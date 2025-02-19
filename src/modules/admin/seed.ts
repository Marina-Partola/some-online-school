import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BasePayload } from "payload";

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

export const seed = async (payload: BasePayload) => {
  if (process.env.NODE_ENV === "development") {
    // seed users
    const users = await payload.find({
      collection: "users",
    });

    if (users.docs.length === 0) {
      await payload.create({
        collection: "users",
        data: {
          email: "admin@gmail.com",
          password: "123",
        },
      });
    }

    // seed teamMembers
    const teamMembers = await payload.find({
      collection: "teamMembers",
    });

    if (teamMembers.docs.length === 0) {
      const avatars = await Promise.all([
        payload.create({
          collection: "media",
          filePath: resolve(__dirname, "./stub/teamMembers/avatar1.png"),
          data: { alt: "avatar1" },
        }),
        payload.create({
          collection: "media",
          filePath: resolve(__dirname, "./stub/teamMembers/avatar2.webp"),
          data: { alt: "avatar2" },
        }),
        payload.create({
          collection: "media",
          filePath: resolve(__dirname, "./stub/teamMembers/avatar3.jpeg"),
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

    // seed instructors
    const instructors = await payload.find({
      collection: "instructors",
    });

    if (instructors.docs.length === 0) {
      const avatars = await Promise.all([
        payload.create({
          collection: "media",
          filePath: resolve(__dirname, "./stub/instructors/avatar1.jpeg"),
          data: { alt: "avatar1" },
        }),
        payload.create({
          collection: "media",
          filePath: resolve(__dirname, "./stub/instructors/avatar2.jpeg"),
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

    // seed courses
    const courses = await payload.find({
      collection: "courses",
    });

    if (!courses.docs.length) {
      const instructors = await payload.find({
        collection: "instructors",
      });
      const courses = [
        {
          title: {
            ru: "Введение в React",
            en: "Introduction to React",
          },
          description: {
            ru: "Изучите основы React",
            en: "Learn the basics of React",
          },
          duration: {
            ru: "4 недели",
            en: "4 weeks",
          },
          level: "beginner",
          topics: [
            { title: "JSX" },
            { title: "Components" },
            { title: "State" },
            { title: "Props" },
          ],
          instructor: instructors.docs[0],
        },
        {
          title: {
            ru: "Продвинутый JavaScript",
            en: "Advanced JavaScript",
          },
          description: {
            ru: "Освойте концепции JavaScript",
            en: "Master JavaScript concepts",
          },
          duration: {
            ru: "6 недель",
            en: "6 weeks",
          },
          level: "intermediate",
          topics: [
            { title: "Closures" },
            { title: "Promises" },
            { title: "Async/Await" },
            { title: "Modules" },
          ],
          instructor: instructors.docs[0],
        },
        {
          title: {
            ru: "CSS Flexbox и Grid",
            en: "CSS Flexbox and Grid",
          },
          description: {
            ru: "Современные техники верстки на CSS",
            en: "Modern CSS layout techniques",
          },
          duration: {
            ru: "3 недели",
            en: "3 weeks",
          },
          level: "beginner",
          topics: [{ title: "Flex" }, { title: "Grid" }],
          instructor: instructors.docs[1],
        },
        {
          title: {
            ru: "Основы Node.js",
            en: "Node.js Fundamentals",
          },
          description: {
            ru: "Серверный JavaScript с Node.js",
            en: "Server-side JavaScript with Node.js",
          },
          duration: {
            ru: "5 недель",
            en: "5 weeks",
          },
          level: "beginner",
          topics: [{ title: "Async" }, { title: "Module system" }],
          instructor: instructors.docs[1],
        },
      ];

      for (const course of courses) {
        const createdCourse = await payload.create({
          collection: "courses",
          locale: "ru",
          data: {
            title: course.title.ru,
            description: course.description.ru,
            duration: course.duration.ru,
            level: course.level as
              | "beginner"
              | "intermediate"
              | "upper-intermediate",
            topics: course.topics,
            instructor: course.instructor.id,
          },
        });
        await payload.update({
          collection: "courses",
          id: createdCourse.id,
          locale: "en",
          data: {
            title: course.title.en,
            description: course.description.en,
            duration: course.duration.en,
            level: course.level as
              | "beginner"
              | "intermediate"
              | "upper-intermediate",
            topics: course.topics,
          },
        });
      }
    }
  }
};
