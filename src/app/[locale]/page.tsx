import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { teamMembers } from "@/mocks/teamMembers";

export default function About() {
  const benefits = [
    "Гибкий график обучения",
    "Опытные преподаватели из разных областей",
    "Интерактивные и увлекательные онлайн-занятия",
    "Персонализированные учебные планы",
    "Современная программа, регулярно обновляемая",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">О нашей школе</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Наша цель</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            В Онлайн Школе мы стремимся предоставить качественное образование,
            доступное каждому, в любой точке мира. Наша миссия — дать учащимся
            знания и навыки, которые помогут им добиться успеха в быстро
            меняющемся цифровом мире.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Почему выбирают нас?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {benefits.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-semibold mb-4">Наша команда</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.name}>
            <CardHeader>
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-center mt-2">{member.name}</CardTitle>
              <CardDescription className="text-center">
                {member.role}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
