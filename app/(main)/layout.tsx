import "../globals.css";
import Header from "@/src/widgets/Header";
import { Providers } from "../providers";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/shared/config/authConfig";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authConfig);
  return (
    <>
      <Providers session={session}>
        <Header />
        {children}
      </Providers>
    </>
  );
}
