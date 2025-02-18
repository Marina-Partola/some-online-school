import { getTranslations } from "next-intl/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

import { Link } from "@/i18n/routing";

interface Instructor {
  name: string;
  id: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: Instructor;
  duration: string;
}

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = async ({ course }) => {
  const t = await getTranslations("coursesPage.courseCard");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
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
        <p className="mb-4 text-sm text-muted-foreground">
          {t("duration")}: {course.duration}
        </p>
        <Link href={`/courses/${course.id}`}>
          <Button>{t("more")}</Button>
        </Link>
      </CardContent>
    </Card>
  );
};
