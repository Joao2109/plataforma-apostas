import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Google from "next-auth/providers/google";
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    async jwt({ user }) {
      console.log({ ...user, balance: 100 });
      return { ...user, balance: 100 };
    },
  },
});
