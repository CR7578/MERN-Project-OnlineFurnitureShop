import React from "react";
import Layout from "../components/Loyout/Layout";
import { Link } from "react-router-dom";

function Pagenotfound() {
  return (
    <Layout title={"404 Page Not Found"}>
      <center>
        <section className="page_404">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 ">
                <div className="col-sm-10 col-sm-offset-1  text-center">
                  <div className="four_zero_four_bg">
                    <h1 className="text-center ">404 Page Not Found</h1>
                  </div>
                  <div className="contant_box_404">
                    <h3 className="h2">Look like you're lost</h3>
                    <p>The page you are looking for is not availble!</p>
                    <Link to="/" className="link_404">
                      Go to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </center>
    </Layout>
  );
}

export default Pagenotfound;
