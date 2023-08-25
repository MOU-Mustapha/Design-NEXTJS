import React from "react";
import NavHeader from "./NavHeader";
import Footer from "./Footer";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Blog</title>
      </Head>
      <NavHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
