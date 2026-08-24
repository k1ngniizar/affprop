import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./validations";
import { validateCredentials } from "./services/auth.service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials);

        if (!validated.success) {
          return null;
        }

        return validateCredentials(
          validated.data.email,
          validated.data.password,
        );
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;

        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;

      session.user.role = token.role as string;

      return session;
    },
  },
});
