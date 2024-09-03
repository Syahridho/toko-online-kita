import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_API_URL,
  providers: [
    // CredentialsProvider({
    //   type: "credentials",
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     const { email, password } = credentials as {
    //       email: string;
    //       password: string;
    //     };
    //   },
    // }),
  ],
};

export default NextAuth(authOptions);
