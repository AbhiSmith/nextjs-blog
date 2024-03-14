import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectTODb } from "./utils";
import { User } from "./model";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
  try {
    connectTODb();
    console.log(credentials);
    const user = await User.findOne({ username: credentials.username });
    // if (!user) throw new Error("Wrong credentials!");
    if (!user) return null;
    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (error) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const {
  // const user = User.findOne({ email: profile.email });
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      if (user.account.provider === "github") {
        const emails = user.user.email;
        console.log(emails);
        await connectTODb();
        try {
          const users = await User.findOne({ email: emails });
          console.log(users);
          if (!users) {
            const newUser = new User({
              username: user.user.name,
              email: user.user.email,
              image: user.user.image,
            });
            await newUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});
