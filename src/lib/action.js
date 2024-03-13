"use server";
import { Post } from "./model";
import { User } from "./model";

import { connectTODb } from "./utils";

// import { getPosts } from "./data";
import { revalidatePath } from "next/cache";
import { signOut, signIn } from "./auth";

//   console.log("Hello, world!");
// };

export const addPost = async (fromData) => {
  "use server";
  //   const title = fromData.get("title");
  //   const desc = fromData.get("desc");
  //   const slug = fromData.get("slug");
  //   const username = fromData.get("userId");
  //   console.log(fromData);
  const { title, desc, slug, userId } = Object.fromEntries(fromData);
  try {
    connectTODb();
    const newPost = await new Post({ title, desc, slug, userId });
    await newPost.save();
    console.log("Post added successfully");
  } catch (error) {
    console.log(error.message);
    return { error: "Something went wrong" };
  }
};

export const getPost = async () => {
  "use server";
  console.log("Getting post");
  try {
    connectTODb();
    // const post = await getPosts();
    const post = await Post.find({});

    revalidatePath("/blog");

    console.log(post);
  } catch (error) {
    console.log(error);
    return { error: "error" };
  }
};

export const deletePost = async (fromData) => {
  "use server";
  const { id } = Object.fromEntries(fromData);
  try {
    connectTODb();
    await Post.findByIdAndDelete(id);
    console.log("Post deleted successfully");

    revalidatePath("/blog");
  } catch (error) {
    console.log(error);
    return { error: "Something Went Wrong" };
  }
};

export const handleGithubLogin = async () => {
  // "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};

export const registerUser = async (fromData) => {
  try {
    connectTODb();
    const { username, email, password, img } = Object.fromEntries(fromData);
    const validUser = await User.findOne({ username });
    if (validUser) {
      return console.log("User already exists");
    }
    const user = await new User({ username, email, password, img });
    await user.save();

    return console.log("User registered successfully");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
