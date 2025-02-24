import { BasePayload } from "payload";

export const seedCourses = async (payload: BasePayload) => {
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
};
