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
import { courses } from "@/mocks/courses";
import { Link } from "@/i18n/routing";

async function getCourse(id: string) {
  const course = courses.find((c) => c.id === id);
  if (!course) {
    return null;
  }
  return course;
}

interface Args {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Args) {
  const { id } = await params;

  return {
    title: courses.find((course) => course.id === id)!.title,
    description: courses.find((course) => course.id === id)!.description,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourse(id);
  const t = await getTranslations("coursePage");

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{course.title}</CardTitle>
          <CardDescription>
            {t("instructor")}:{" "}
            <Link
              href={`/instructors/${course.instructor.id}`}
              className="hover:underline"
            >
              {course.instructor.name}
            </Link>
          </CardDescription>
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
              {course.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
          <Button size="lg">{t("enrollButton")}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
