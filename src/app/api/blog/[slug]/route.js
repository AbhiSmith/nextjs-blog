import { Post } from "@/lib/model";
import { connectTODb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { sulg } = params;

  try {
    connectTODb();
    const post = await Post.findOne({ slug: sulg });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 201 });
  }
};

export const DELETE = async (request, { params }) => {
  const { sulg } = params;
  try {
    connectTODb();
    await Post.deleteOne({ slug: sulg });
    return NextResponse.json({ message: "Delete Succesfull" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: " Faild Delete Post" }, { status: 201 });
  }
};
