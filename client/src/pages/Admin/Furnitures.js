import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Loyout/AdminMenu";
import Layout from "../../components/Loyout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Furnitures = () => {
  const [furnitures, setFurniture] = useState([]);

  //Get all furnitures
  const getAllFurnitures = async () => {
    try {
      const { data } = await axios.get("/api/v1/furniture/get-furniture");
      setFurniture(data.furnitures);
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllFurnitures();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Furnitures</h1>
            <div className="d-flex flex-wrap">
              {furnitures?.map((f) => (
                <Link
                  to={`/dashboard/admin/update-furniture/${f.slug}`}
                  className="furniture"
                >
                  <div
                    className="card m-2"
                    style={{ width: "18rem" }}
                    key={f._id}
                  >
                    <img
                      width={"auto"}
                      height={300}
                      src={`/api/v1/furniture/furniture-photo/${f._id}`}
                      className="card-img-top"
                      alt={f.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{f.name}</h5>
                      <p className="card-text">{f.description}</p>
                      <p className="card-text">₹ {f.price}</p>
                      <h6
                        className={
                          f.quantity > 0
                            ? `text-success text-end`
                            : `text-danger text-end`
                        }
                      >
                        {f.quantity > 0
                          ? `${f.quantity} Stocks Available`
                          : `Out of Stock`}
                      </h6>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Furnitures;
