// src/app/providers.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Session } from "next-auth";
import { NextIntlClientProvider } from "next-intl";

const queryClient = new QueryClient();
export function Providers({
  children,
  session,
  locale,
  messages,
  timeZone,
}: {
  children: React.ReactNode;
  session: Session | null;
  messages: Record<string, any>;
  locale: string;
  timeZone: string;
}) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <NextIntlClientProvider
          messages={messages}
          locale={locale}
          timeZone={timeZone}
        >
          {children}
        </NextIntlClientProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
