import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

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

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>
          Преподаватель:{" "}
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
          Продолжительность: {course.duration}
        </p>
        <Link href={`/courses/${course.id}`}>
          <Button>Подробнее</Button>
        </Link>
      </CardContent>
    </Card>
  );
};
