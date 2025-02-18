"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { usePathname } from "@/i18n/routing";
import { ILocale } from "@/types";

const locales: ILocale[] = ["en", "ru"];

export const SwitchLang: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const startLocale = useLocale();

  const [lang, setLang] = useState(startLocale);

  const handleChangeLang = (value: string) => {
    setLang(value);
    router.push(`/${value}${pathname}`);
  };

  return (
    <Select value={lang} onValueChange={handleChangeLang}>
      <SelectTrigger>
        <SelectValue>{lang}</SelectValue>
      </SelectTrigger>

      <SelectContent>
        {locales.map((it) => (
          <SelectItem key={it} value={it}>
            {it}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
