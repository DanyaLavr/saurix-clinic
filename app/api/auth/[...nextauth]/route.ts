import NextAuth from "next-auth";
import { authConfig } from "@/src/shared/config/authConfig";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
