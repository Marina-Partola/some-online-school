import { getTranslations } from "next-intl/server";
import { CoursesList } from "./components/CoursesList";
import { getAppPayload } from "@/utils/getAppPayload";
import { ILocale } from "@/types";

export async function generateMetadata() {
  const t = await getTranslations("coursesPage.meta");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: ILocale }>;
}) {
  const { locale } = await params;
  const payload = await getAppPayload();
  const courses = await payload.find({
    collection: "courses",
    locale,
  });

  return <CoursesList courses={courses.docs} />;
}
