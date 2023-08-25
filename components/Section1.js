import Image from "next/image";
import Link from "next/link";
import React from "react";
import Author from "./_child/Author";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import fetcher from "@/lib/fetcher";
import Spinner from "./_child/Spinner";
import Error from "./_child/Error";

const Section1 = () => {
  const { data, isLoading, isError } = fetcher("api/trending");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
  return (
    <section
      className="py-16"
      style={{
        backgroundImage: "url('/images/banner.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "950px",
        backgroundSize: "400px",
      }}
    >
      <div className="container mx-auto md:px-20">
        <h1 className="font-bold text-4xl pb-12 text-center">Trending</h1>
        <Swiper slidesPerView={1}>
          {data?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Slide item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Section1;

const Slide = ({
  item: { id, title, category, img, description, published, author },
}) => {
  return (
    <div className="grid md:grid-cols-2">
      <div className="image">
        <Link href="/">
          <Image alt={category} src={img || "/"} width={500} height={500} />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
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
            className="text-3xl md:text-5xl font-bold text-gray-800 hover:text-gray-600 "
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
