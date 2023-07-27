import React, { useState, useEffect } from "react";
import Layout from "../components/Loyout/Layout";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCart } from "../context/Cart";

const CategoryFurniture = () => {
  const [cart, setCart] = useCart();

  const navigate = useNavigate();
  const params = useParams();
  const [furnitures, setFurnitures] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    if (params?.slug) getFurnitureByCate();
  }, [params?.slug]);

  const getFurnitureByCate = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/furniture/furniture-category/${params.slug}`
      );
      setFurnitures(data?.furnitures);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1>{category?.name}</h1>
        <h5>{furnitures?.length} Results Found</h5>
        <div className="d-flex flex-wrap">
          {furnitures?.map((f) => (
            <div className="card m-2" style={{ width: "18rem" }} key={f._id}>
              <img
                width={"auto"}
                height={300}
                src={`/api/v1/furniture/furniture-photo/${f._id}`}
                className="card-img-top"
                alt={f.name}
              />
              <div className="card-body">
                <h5 className="card-title">{f.name}</h5>
                <p className="card-text">{f.description.substring(0, 90)}...</p>
                <p className="card-text">₹ {f.price}/-</p>
                <h6>Ratings : {"⭐️".repeat(f.ratings)}</h6>
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
                <button
                  className="btn btn-primary ms-2"
                  onClick={() => {
                    navigate(`/furniture/${f.slug}`);
                  }}
                >
                  More Details
                </button>
                <button
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setCart([...cart, f]);
                    localStorage.setItem("cart", JSON.stringify([...cart, f]));
                    toast.success("Furniture Added to Cart");
                  }}
                  disabled={f.quantity < 1}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryFurniture;
