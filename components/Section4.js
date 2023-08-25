import React from "react";
import Author from "./_child/Author";
import Link from "next/link";
import Image from "next/image";
import fetcher from "@/lib/fetcher";
import Spinner from "./_child/Spinner";
import Error from "./_child/Error";

const Section4 = () => {
  const { data, isLoading, isError } = fetcher("api/popular");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
  return (
    <section className="container mx-auto md:px-20 py-16">
      <div className="grid lg:grid-cols-2">
        <div className="first-col">
          <h1 className="font-bold text-4xl py-12">Business</h1>
          <div className="flex flex-col gap-6">
            {data[0] ? <Post data={data[0]} /> : null}
            {data[1] ? <Post data={data[1]} /> : null}
            {data[2] ? <Post data={data[2]} /> : null}
          </div>
        </div>
        <div className="sec-col">
          <h1 className="font-bold text-4xl py-12">Travel</h1>
          <div className="flex flex-col gap-6">
            {data[3] ? <Post data={data[3]} /> : null}
            {data[4] ? <Post data={data[4]} /> : null}
            {data[0] ? <Post data={data[0]} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;

const Post = ({
  data: { id, title, category, img, description, published, author },
}) => {
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href="/">
          <Image
            alt={category}
            className="rounded"
            src={img || "/"}
            width={300}
            height={300}
            style={{ height: "160px" }}
          />
        </Link>
      </div>
      <div className="info flex flex-col justify-center">
        <div className="cat">
          <Link className="text-orange-600 hover:text-orange-800" href="/">
            {category || "Unknown"}
          </Link>
          <Link className="text-gray-800 hover:text-gray-600" href="/">
            - {published || "Unknown"}
          </Link>
        </div>
        <div className="title">
          <Link
            className="text-xl first-letter:font-bold text-gray-800 hover:text-gray-600 "
            href="/"
          >
            {title || "Unknown"}
          </Link>
        </div>
        {author && <Author {...author} />}
      </div>
    </div>
  );
};
