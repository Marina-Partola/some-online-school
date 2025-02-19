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

import { getTranslations } from "next-intl/server";
import { getAppPayload } from "@/utils/getAppPayload";
import React from "react";
import { ILocale } from "@/types";

interface Args {
  params: Promise<{
    id: string;
    locale: ILocale;
  }>;
}

export async function generateMetadata({ params }: Args) {
  const { id, locale } = await params;
  const t = await getTranslations("instructorPage.meta");

  const payload = await getAppPayload();

  const instructorData = await payload.find({
    collection: "instructors",
    where: {
      id: {
        equals: id,
      },
    },
    locale,
  });

  if (!instructorData.docs.length) {
    return {
      title: "not found",
    };
  }

  const instructor = instructorData.docs[0];

  return {
    title: t("title", {
      name: instructor.name,
    }),
    description: instructor.expertise,
  };
}

export default async function InstructorPage({
  params,
}: {
  params: Promise<{ id: string; locale: ILocale }>;
}) {
  const t = await getTranslations("instructorPage");
  const { id, locale } = await params;

  const payload = await getAppPayload();

  const instructorData = await payload.find({
    collection: "instructors",
    where: {
      id: {
        equals: id,
      },
    },
    locale,
  });

  if (!instructorData.docs.length) {
    notFound();
  }

  const instructor = instructorData.docs[0];

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-3xl mx-auto mb-8">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={
                typeof instructor.avatar === "object"
                  ? (instructor.avatar.url ?? "")
                  : ""
              }
              alt={instructor.name}
            />
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
                  {skill.title}
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
        {instructor.courses?.map((course) =>
          typeof course === "object" ? (
            <CourseCard key={course.id} course={course} />
          ) : null
        )}
      </div>
    </div>
  );
}
