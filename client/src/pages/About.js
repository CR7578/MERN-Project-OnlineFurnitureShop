import React from "react";
import Layout from "../components/Loyout/Layout";

function About() {
  return (
    <Layout title={"Aboust Us"}>
      <div className="container mt-4">
        <h2 className="text-center">About Us</h2>
        <p>
          Welcome to <b>FURNI-HUB</b>, your one-stop destination for
          high-quality and stylish furniture. We believe that furniture is not
          just a functional item but also an expression of your personal style
          and taste.
        </p>
        <p>
          At <b>FURNI-HUB</b>, we curate a wide range of furniture pieces from
          renowned designers and manufacturers to help you transform your space
          into a comfortable and visually appealing environment. Whether you're
          furnishing your home, office, or any other space, we have the perfect
          pieces to suit your needs.
        </p>
        <p>
          Our team of experienced interior designers and furniture experts
          carefully selects each product in our collection to ensure exceptional
          quality, durability, and aesthetic appeal. We understand that choosing
          furniture can be overwhelming, which is why we strive to provide you
          with a seamless shopping experience.
        </p>
        <p>
          Customer satisfaction is our top priority, and we go above and beyond
          to exceed your expectations. From our user-friendly website to our
          dedicated customer support team, we aim to provide you with the best
          possible service at every step of your journey with us.
        </p>
        <p>
          Explore our extensive catalog and discover a wide variety of furniture
          options, ranging from classic and timeless designs to modern and
          contemporary styles. Whether you're looking for a cozy sofa, a sturdy
          dining table, or functional storage solutions, we have it all.
        </p>
        <p>
          Thank you for choosing <b>FURNI-HUB</b>. We look forward to helping
          you create a space that reflects your unique personality and brings
          your design vision to life.
        </p>
      </div>{" "}
    </Layout>
  );
}

export default About;
