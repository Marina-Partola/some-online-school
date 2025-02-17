import { CoursesList } from "./components/CoursesList";

export async function generateMetadata() {
  return {
    title: "SOnS: Курсы",
    description: "Курсы Some online school",
  };
}

export default function CoursesPage() {
  return <CoursesList />;
}
