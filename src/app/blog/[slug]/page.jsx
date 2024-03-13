import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";

const getData = async (slug) => {
  try {
    const res = await fetch(`http://localhost:3000/api/blog/${slug}`); // when you delete etch(`http://localhost:3000/api/blog/${slug}`, {method:"DELETE"})
    // console.log(res);
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

// search engine optimization
export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  // console.log(slug);
  const post = await getPost(slug);
  // console.log(post);

  return {
    title: post.title,
    description: post.desc,
  };
};

const SinglePostPage = async ({ params }) => {
  const { slug } = params;

  getData(slug);

  // FETCH DATA WITH AN API
  // const post = await getData(slug);

  // FETCH DATA WITHOUT AN API
  const post = await getPost(slug);
  // console.log(post);

  return (
    <div className={styles.container}>
      {post.img && (
        <div className={styles.imgContainer}>
          <Image src={post.img} alt="" fill className={styles.img} />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {/* {post.createdAt.toString().slice(4, 16)} */}
              {post.createdAt && post.createdAt.toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
