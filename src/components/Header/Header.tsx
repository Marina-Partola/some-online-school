import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import React from "react";
import { GraduationCap } from "lucide-react";

export const Header: React.FC = () => {
  const items = [
    {
      label: "О нас",
      url: "/",
    },
    {
      label: "Список курсов",
      url: "/courses",
    },
  ];

  return (
    <header className="flex items-center gap-3 h-16 pl-6 pr-6 pt-6">
      <GraduationCap width={40} height={40} />

      <NavigationMenu>
        <NavigationMenuList>
          {items.map((item) => (
            <NavigationMenuItem key={item.url} className="cursor-pointer">
              <Link href={item.url} className={navigationMenuTriggerStyle()}>
                {item.label}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
