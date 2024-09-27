import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "@lib/axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const userFound = await axios.post("/login", credentials);

        if (userFound.status === 400) throw new Error("Credenciales inválidas");

        const user = userFound.data;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    maxAge: 60 * 15,
  },
});
