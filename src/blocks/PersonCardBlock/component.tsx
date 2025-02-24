import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Media } from "@/modules/admin/payload.types";

type PersonCardBlockProps = {
  name: string;
  role: string;
  bio: string;
  avatar: Media;
};

export const PersonCardBlock: React.FC<{
  reference: { value: PersonCardBlockProps; id: number }[];
}> = (params) => {
  return (
    <>
      {params.reference.map((it) => {
        const { name, role, bio, avatar } = it.value;
        return (
          <Card className="mb-4" key={it.id}>
            <CardHeader>
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={avatar.url ?? ""} alt={name} />
                <AvatarFallback>
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-center mt-2">{name}</CardTitle>
              <CardDescription className="text-center">{role}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center">{bio}</p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};
