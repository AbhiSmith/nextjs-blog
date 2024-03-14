import { User } from "@/lib/model";
import { connectTODb } from "@/lib/utils";

// create user api
export const POST = async (req, res) => {
  try {
    await connectTODb();

    const { username, password, email, name, isAdmin } = await req.json();
    if (!username || !password || !email || !name) {
      return new Response("Missing required fields", { status: 400 });
    }
    await User.create({ username, password, email, name, isAdmin });

    return new Response("User Create Succesfuly", { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

// health
export const GET = async (req, res) => {
  connectTODb();
  const users = await User.find();
  return new Response(users, { status: 200 });
};

export const DELETE = async (req, res) => {
  try {
    await connectTODb();
    const { id } = await req.json();
    if (!id) {
      return new Response("Missing required fields", { status: 400 });
    }
    await User.findByIdAndDelete(id);
    return new Response("User Delete Succesfuly", { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
