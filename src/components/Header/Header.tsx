import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import React from "react";
import { GraduationCap } from "lucide-react";
import { SwitchLang } from "../SwitchLang";

export const Header: React.FC = async () => {
  const t = await getTranslations("common.header.menu");
  const items = [
    {
      label: t("aboutUs"),
      url: "/",
    },
    {
      label: t("listCourses"),
      url: "/courses",
    },
  ];

  return (
    <header className="px-8 pt-6">
      <div className="max-w-1200 flex items-center gap-3 h-16 ">
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

        <div className="ml-auto">
          <SwitchLang />
        </div>
      </div>
    </header>
  );
};
