import Image from "next/image";
import Link from "next/link";
import React from "react";

const Author = ({ name, img, designation }) => {
  if (!name && !img) return null;
  return (
    <div className="author flex py-5">
      <Image
        src={img || "/"}
        alt="author"
        width={60}
        height={60}
        className="rounded-full"
      />
      <div className="flex flex-col justify-center px-4">
        <Link
          href="/"
          className="text-md font-bold text-gray-800 hover:text-gray-600"
        >
          {name || "Unknown"}
        </Link>
        <span className="text-sm text-gray-500">
          {designation || "Unknown"}
        </span>
      </div>
    </div>
  );
};

export default Author;
