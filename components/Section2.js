import Image from "next/image";
import Link from "next/link";
import React from "react";
import Author from "./_child/Author";
import fetcher from "../lib/fetcher";
import Spinner from "./_child/Spinner";
import Error from "./_child/Error";

const Section2 = () => {
  const { data, isLoading, isError } = fetcher("api/posts");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
  return (
    <section className="container mx-auto md:px-20 py-10">
      <h1 className="font-bold text-center text-4xl py-12">Latest Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {data?.map((post, index) => {
          return <Post post={post} key={index} />;
        })}
      </div>
    </section>
  );
};

export default Section2;

const Post = ({
  post: { id, title, category, img, description, published, author },
}) => {
  return (
    <div className="item">
      <div className="image">
        <Link href={`/posts/${id}`}>
          <Image
            alt={category}
            src={img || ""}
            width={500}
            height={350}
            className="rounded"
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
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
        <p className="text-gray-500 py-3 text-sm">{description || "Unknown"}</p>
        {author && <Author {...author} />}
      </div>
    </div>
  );
};
