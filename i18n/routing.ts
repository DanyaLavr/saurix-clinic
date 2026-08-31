import { defineRouting } from "next-intl/routing";
export const routing = defineRouting({
  locales: ["en", "es", "uk", "ru"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});
