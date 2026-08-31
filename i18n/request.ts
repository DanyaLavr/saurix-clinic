import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

const namespaces = [
  "auth",
  "login-form",
  "register-form",
  "metadata",
  "common",
  "submit-booking",
  "header",
];

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = Object.fromEntries(
    await Promise.all(
      namespaces.map(async (ns) => [
        ns,
        (await import(`../locales/${locale}/${ns}.json`)).default,
      ]),
    ),
  );

  return { locale, messages, timeZone: "Europe/Madrid" };
});
