import Link from "next/link";
import React from "react";
import Author from "./Author";
import Image from "next/image";
import fetcher from "@/lib/fetcher";
import Spinner from "./Spinner";
import Error from "./Error";

const Related = () => {
  const { data, isLoading, isError } = fetcher("/api/posts");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
  return (
    <section className="pt-20">
      <h1 className="font-bold text-3xl py-10">Related</h1>
      <div className="flex flex-col gap-10">
        {data?.map((post) => {
          return <Post post={post} key={post.id} />;
        })}
      </div>
    </section>
  );
};

export default Related;

const Post = ({ post: { id, title, category, img, published, author } }) => {
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href={`/posts/${id}`}>
          <Image
            alt="img"
            className="rounded"
            src={img || "/"}
            width={300}
            height={200}
            style={{ height: "160px" }}
          />
        </Link>
      </div>
      <div className="info flex flex-col justify-center">
        <div className="cat">
          <Link
            className="text-orange-600 hover:text-orange-800"
            href={`/posts/${id}`}
          >
            {category || "Unknown"}
          </Link>
          <Link
            className="text-gray-800 hover:text-gray-600"
            href={`/posts/${id}`}
          >
            - {published || "Unknown"}
          </Link>
        </div>
        <div className="title">
          <Link
            className="text-xl first-letter:font-bold text-gray-800 hover:text-gray-600 "
            href={`/posts/${id}`}
          >
            {title || "Unknown"}
          </Link>
        </div>
        {author && <Author {...author} />}
      </div>
    </div>
  );
};
