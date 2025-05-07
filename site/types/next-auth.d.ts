import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      balance?: number;
    };
  }

  interface User {
    balance?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    balance?: number;
  }
}

export default NextAuth;
