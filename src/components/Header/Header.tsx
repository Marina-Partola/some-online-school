import { Link } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import React from "react";
import { GraduationCap } from "lucide-react";
import { SwitchLang } from "../SwitchLang";
import { getAppPayload } from "@/utils/getAppPayload";
import { ILocale } from "@/types";

export const Header: React.FC = async () => {
  const locale = (await getLocale()) as ILocale;
  const payload = await getAppPayload();
  const items =
    (await payload.findGlobal({ slug: "navigation", locale })).links ?? [];

  return (
    <header className="px-8 pt-6">
      <div className="max-w-1200 flex items-center gap-3 h-16 ">
        <GraduationCap width={40} height={40} />

        <NavigationMenu>
          <NavigationMenuList>
            {items.map((item) => {
              const url =
                typeof item.reference?.value === "object"
                  ? item.reference?.value.slug
                  : null;

              return (
                <React.Fragment key={item.id}>
                  {url && (
                    <NavigationMenuItem className="cursor-pointer">
                      <Link href={url} className={navigationMenuTriggerStyle()}>
                        {item.label}
                      </Link>
                    </NavigationMenuItem>
                  )}
                </React.Fragment>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto">
          <SwitchLang />
        </div>
      </div>
    </header>
  );
};
