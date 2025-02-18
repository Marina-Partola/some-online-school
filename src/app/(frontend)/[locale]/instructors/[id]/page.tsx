import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/mocks/courses";
import { instructors } from "@/mocks/instructors";
import { getTranslations } from "next-intl/server";

async function getInstructor(id: string) {
  return instructors.find((i) => i.id === id) || null;
}

async function getCoursesByInstructor(instructorId: string) {
  return courses.filter((c) => c.instructor.id === instructorId);
}

interface Args {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Args) {
  const { id } = await params;
  const t = await getTranslations("instructorPage.meta");

  return {
    title: t("title", {
      name: instructors.find((course) => course.id === id)!.name,
    }),
    description: instructors.find((course) => course.id === id)!.expertise,
  };
}

export default async function InstructorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = await getTranslations("instructorPage");
  const { id } = await params;
  const instructor = await getInstructor(id);

  if (!instructor) {
    notFound();
  }

  const courses = await getCoursesByInstructor(id);

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto mb-8">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={instructor.avatar} alt={instructor.name} />
            <AvatarFallback>
              {instructor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-3xl">{instructor.name}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{instructor.bio}</p>
          <div>
            <h3 className="font-semibold mb-2">{t("experience")}</h3>
            <div className="flex flex-wrap gap-2">
              {instructor.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">
        {t("otherCourses", { name: instructor.name })}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
