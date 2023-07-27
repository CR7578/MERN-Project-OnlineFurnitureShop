import React from "react";
import Layout from "../components/Loyout/Layout";

function Contact() {
  return (
    <Layout title={"Contact Us"}>
      <div className="container mt-4">
        <h2 className="text-center">Contact Us</h2>
        <p>
          For any queries or assistance, please feel free to reach out to us.
          You can contact our customer support team at:
        </p>
        <p className="email">Support@furnihub.com</p>
        <p>
          We aim to respond to all inquiries within 24 hours. Whether you have
          questions about our products, need help with an order, or require any
          other information, our team is here to assist you.
        </p>
        <p>
          When contacting us via email, please ensure to provide the following
          details to help us serve you better:
        </p>
        <ul>
          <li>Your full name</li>
          <li>Contact number</li>
          <li>Order number (if applicable)</li>
          <li>Details of your inquiry or issue</li>
        </ul>
        <p>Example format for emailing us:</p>
        <pre>
          <code>
            Subject: [Your Name] - [Inquiry/Issue]
            <br />
            <br />
            Full Name: [Your Name]
            <br />
            Contact Number: [Your Contact Number]
            <br />
            Order Number (if applicable): [Order Number]
            <br />
            <br />
            [Details of your inquiry or issue]
          </code>
        </pre>
        <p>
          We appreciate your feedback and strive to provide you with the best
          possible customer service. Thank you for choosing FURNI-HUB!
        </p>
      </div>{" "}
    </Layout>
  );
}

export default Contact;
