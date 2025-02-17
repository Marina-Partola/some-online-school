"use client";

import { Input } from "@/components/ui/input";
import { CourseCard } from "@/components/CourseCard";
import { useState } from "react";
import { courses } from "@/mocks/courses";

export const CoursesList: React.FC = () => {
  const [filteredCourses, setFilteredCourses] = useState(courses);

  const handleSearchCourse = (value: string) => {
    setFilteredCourses(
      courses.filter((course) =>
        course.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Курсы</h1>
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Искать курс..."
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
