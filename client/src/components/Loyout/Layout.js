import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, author, keywords, description }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>{" "}
      <Header />
      <main style={{ minHeight: "76vh" }}>{children}</main>
      <Toaster />
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Online Furniture Shop",
  description: "MERN Proect by CHETHAN N",
  keywords: "MERN,Furniture shop, node,react,mongodb,express",
  author: "CHETHAN N",
};

export default Layout;
