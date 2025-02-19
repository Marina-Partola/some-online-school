import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTranslations } from "next-intl/server";
import { getAppPayload } from "@/utils/getAppPayload";
import { ILocale } from "@/types";

export default async function About({
  params,
}: {
  params: Promise<{ locale: ILocale }>;
}) {
  const { locale } = await params;
  const benefits = [
    "Гибкий график обучения",
    "Опытные преподаватели из разных областей",
    "Интерактивные и увлекательные онлайн-занятия",
    "Персонализированные учебные планы",
    "Современная программа, регулярно обновляемая",
  ];

  const t = await getTranslations("aboutPage");
  const payload = await getAppPayload();
  const teamMembers = await payload.find({
    collection: "teamMembers",
    locale,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">{t("title")}</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t("mission.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t("mission.description")}</p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t("benefits.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {benefits.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-semibold mb-4">{t("team.title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.docs.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <Avatar className="w-24 h-24 mx-auto">
                {typeof member.avatar !== "number" && (
                  <AvatarImage
                    src={member.avatar.url ?? ""}
                    alt={member.name}
                  />
                )}
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
