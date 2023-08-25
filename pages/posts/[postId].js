import React from "react";
import Author from "@/components/_child/Author";
import Related from "@/components/_child/Related";
import Image from "next/image";
import fetcher from "@/lib/fetcher";
import Spinner from "@/components/_child/Spinner";
import Error from "@/components/_child/Error";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import getPosts from "@/lib/helper";

const PostsDetailsPage = ({ fallback }) => {
  const {
    query: { postId },
  } = useRouter();
  const { data, isLoading, isError } = fetcher(`api/posts/${postId}`);
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
  return (
    <SWRConfig value={{ fallback }}>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">
          {data.author && <Author {...data.author} />}
        </div>
        <div className="post py-10">
          <h1 className="font-bold text-4xl text-center pb-5">
            {data.title || "Unknown"}
          </h1>
          <p className="text-gray-500 text-xl text-center">
            {data.subtitle || "Unknown"}
          </p>
          <div className="py-10">
            <Image alt="img" src={data.img || "/"} width={900} height={600} />
          </div>
          <div className="content text-gray-600 text-md flex flex-col gap-4">
            {data.description || "Unknown"}
          </div>
        </div>
        <Related />
      </section>
    </SWRConfig>
  );
};

export default PostsDetailsPage;

export async function getStaticProps({ params }) {
  const post = await getPosts(params.postId);
  return {
    props: {
      fallback: {
        "/api/posts": post,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  const paths = posts.map((post) => {
    return { params: { postId: `${post.id}` } };
  });
  return {
    paths,
    fallback: false,
  };
}
