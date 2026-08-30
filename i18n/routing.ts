import { defineRouting } from "next-intl/routing";
export const routing = defineRouting({
  locales: ["en", "es", "ua", "ru"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});
