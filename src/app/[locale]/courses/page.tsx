import { getTranslations } from "next-intl/server";
import { CoursesList } from "./components/CoursesList";

export async function generateMetadata() {
  const t = await getTranslations("coursesPage.meta");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function CoursesPage() {
  return <CoursesList />;
}
