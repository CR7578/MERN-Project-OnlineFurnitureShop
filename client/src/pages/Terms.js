import React from "react";
import Layout from "../components/Loyout/Layout";

function Terms() {
  return (
    <Layout title={"Terms & Conditions"}>
      <div className="container mt-4">
        <h2 className="text-center">Terms & Conditions</h2>
        <p>
          Welcome to <b>FURNI-HUB</b>! These Terms and Conditions govern your
          use of our website and services. By accessing or using our website,
          you agree to comply with these terms.
        </p>
        <p>
          <strong>1. Website Use</strong>
          <br />
          You must be at least 18 years old to use our website. You agree to use
          our website for lawful purposes and not engage in any activity that
          may interfere with its operation or violate applicable laws.
        </p>
        <p>
          <strong>2. Intellectual Property</strong>
          <br />
          All content on our website, including text, graphics, logos, images,
          and software, is the property of FURNI-HUB and protected by
          intellectual property laws. You may not reproduce, distribute, or
          modify any content without our prior written consent.
        </p>
        <p>
          <strong>3. Product Information</strong>
          <br />
          We strive to provide accurate and up-to-date product information on
          our website. However, we do not warrant the accuracy, completeness, or
          reliability of any product descriptions or other content. It is your
          responsibility to verify the information and suitability of products
          before making a purchase.
        </p>
        <p>
          <strong>4. Pricing and Payments</strong>
          <br />
          Prices for our products are subject to change without notice. We
          reserve the right to modify or discontinue any product without
          liability. Payment for orders must be made through the provided
          payment methods, and you agree to provide accurate and complete
          billing information.
        </p>
        <p>
          <strong>5. Shipping and Returns</strong>
          <br />
          Our shipping and returns policy governs the delivery, exchange, and
          return of products. Please review the policy before placing an order
          to understand your rights and responsibilities.
        </p>
        <p>
          <strong>6. Limitation of Liability</strong>
          <br />
          FURNI-HUB shall not be liable for any direct, indirect, incidental,
          consequential, or punitive damages arising out of your use or
          inability to use our website or services. You agree to indemnify and
          hold us harmless from any claims, damages, or losses.
        </p>
        <p>
          <strong>7. Governing Law</strong>
          <br />
          These Terms and Conditions shall be governed by and construed in
          accordance with the laws of [your jurisdiction]. Any disputes arising
          from these terms shall be subject to the exclusive jurisdiction of the
          courts in [your jurisdiction].
        </p>
        <p>
          These Terms and Conditions constitute the entire agreement between you
          and <b>FURNI-HUB</b> regarding the use of our website and services. If
          any provision of these terms is deemed invalid or unenforceable, the
          remaining provisions shall remain in effect.
        </p>
      </div>{" "}
    </Layout>
  );
}

export default Terms;
