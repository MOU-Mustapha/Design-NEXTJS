import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import Author from "./_child/Author";
import fetcher from "@/lib/fetcher";
import Spinner from "./_child/Spinner";
import Error from "./_child/Error";

const Section3 = () => {
  const { data, isLoading, isError } = fetcher("api/popular");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
  return (
    <section className="container mx-auto md:px-20 py-16">
      <h1 className="font-bold text-center text-4xl py-12">Most Popular</h1>
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
      >
        {data?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Post item={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Section3;

const Post = ({
  item: { id, title, category, img, description, published, author },
}) => {
  return (
    <div className="item flex flex-col items-center">
      <div className="image">
        <Link href="/">
          <Image alt={category} src={img || "/"} width={500} height={300} />
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4 ml-8">
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
            className="text-3xl md:text-4xl first-letter:font-bold text-gray-800 hover:text-gray-600 "
            href="/"
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
