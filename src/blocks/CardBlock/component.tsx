import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type CardBlockProps = {
  title: string;
};

export const CardBlock: React.FC<React.PropsWithChildren & CardBlockProps> = ({
  title,
  children,
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
};
