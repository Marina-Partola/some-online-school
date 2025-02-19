"use client";

import { Input } from "@/components/ui/input";
import { CourseCard } from "@/components/CourseCard";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Course } from "@/modules/admin/payload.types";

interface CourseListProps {
  courses: Course[];
}

export const CoursesList: React.FC<CourseListProps> = ({ courses }) => {
  const [filteredCourses, setFilteredCourses] = useState(courses);

  const handleSearchCourse = (value: string) => {
    setFilteredCourses(
      courses.filter((course) =>
        course.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const t = useTranslations("coursesPage");

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>
      <div className="mb-6">
        <Input
          type="search"
          placeholder={t("searchBar.placeholder")}
          className="max-w-sm"
          onChange={(e) => handleSearchCourse(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
