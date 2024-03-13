import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectTODb } from "./utils";
import { User } from "./model";

let connectToDb;

// Dynamically import the connectTODb function from the "./utils" module
// import("./utils")
//   .then((module) => {
//     connectToDb = module.connectToDb;
//   })
//   .catch((error) => {
//     console.error("Error loading connectToDb function:", error);
//   });

// Ensure that the connectToDb function is available before using it
// const doSomethingWithDb = async () => {
//   if (!connectToDb) {
//     console.error("connectToDb function is not yet loaded");
//     return;
//   }

//   await connectToDb();
// };

export const {
  // const user = User.findOne({ email: profile.email });
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
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
  },
});
