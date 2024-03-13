import { Post } from "@/lib/model";
import { connectTODb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    connectTODb();
    const posts = await Post.find();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 201 });
  }
};
