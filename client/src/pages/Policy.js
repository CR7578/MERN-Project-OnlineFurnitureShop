import React from "react";
import Layout from "../components/Loyout/Layout";

function Policy() {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="container mt-4">
        <h2 className="text-center">Privacy Policy</h2>
        <p>
          At <b>FURNI-HUB</b>, we value your privacy and are committed to
          protecting your personal information. This Privacy Policy explains how
          we collect, use, and safeguard the information you provide to us
          through our website.
        </p>
        <p>
          <strong>1. Information We Collect</strong>
          <br />
          We collect personal information, such as your name, email address,
          contact number, and shipping address when you place an order or create
          an account on our website. Additionally, we may collect anonymous
          usage information through cookies and similar technologies to enhance
          your browsing experience.
        </p>
        <p>
          <strong>2. How We Use Your Information</strong>
          <br />
          We use the information we collect to process your orders, provide
          customer support, personalize your shopping experience, and improve
          our services. We may also send you promotional emails or newsletters
          if you have opted to receive them.
        </p>
        <p>
          <strong>3. Information Sharing</strong>
          <br />
          We do not sell, trade, or rent your personal information to third
          parties. However, we may share your information with trusted service
          providers who assist us in operating our website and conducting our
          business, such as payment processors and shipping companies.
        </p>
        <p>
          <strong>4. Data Security</strong>
          <br />
          We implement industry-standard security measures to protect your
          information from unauthorized access, alteration, or disclosure.
          However, please note that no method of transmission over the internet
          or electronic storage is completely secure.
        </p>
        <p>
          <strong>5. Your Choices</strong>
          <br />
          You can update your personal information, unsubscribe from promotional
          emails, and manage your cookie preferences by accessing your account
          settings on our website. If you have any concerns about your privacy
          or wish to exercise your rights regarding your personal data, please
          contact our customer support.
        </p>
        <p>
          This Privacy Policy is subject to change. We encourage you to review
          this page periodically for any updates. By using our website, you
          consent to the terms outlined in this Privacy Policy.
        </p>
      </div>{" "}
    </Layout>
  );
}

export default Policy;
