import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { getAppPayload } from "@/utils/getAppPayload";
import { ILocale } from "@/types";

interface Args {
  params: Promise<{
    id: string;
    locale: ILocale;
  }>;
}

export async function generateMetadata({ params }: Args) {
  const { id, locale } = await params;

  const payload = await getAppPayload();

  const courseData = await payload.find({
    collection: "courses",
    where: {
      id: {
        equals: id,
      },
    },
    locale,
  });

  if (!courseData.docs.length) {
    return null;
  }

  const course = courseData.docs[0];

  return {
    title: course.title,
    description: course.description,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string; locale: ILocale }>;
}) {
  const { id, locale } = await params;
  const t = await getTranslations("coursePage");
  const payload = await getAppPayload();
  const courseData = await payload.find({
    collection: "courses",
    where: {
      id: {
        equals: id,
      },
    },
    locale,
  });

  if (!courseData.docs.length) {
    notFound();
  }

  const course = courseData.docs[0];

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{course.title}</CardTitle>
          {typeof course.instructor !== "number" && (
            <CardDescription>
              {t("instructor")}:{" "}
              <Link
                href={`/instructors/${course.instructor.id}`}
                className="hover:underline"
              >
                {course.instructor.name}
              </Link>
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <p className="mb-4">{course.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold">{t("duration")}</h3>
              <p>{course.duration}</p>
            </div>
            <div>
              <h3 className="font-semibold">{t("level")}</h3>
              <p>{course.level}</p>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">{t("topics")}</h3>
            <ul className="list-disc list-inside">
              {course.topics.map((topic) => (
                <li key={topic.title}>{topic.title}</li>
              ))}
            </ul>
          </div>
          <Button size="lg">{t("enrollButton")}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
