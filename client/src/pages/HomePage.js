import React, { useState, useEffect } from "react";
import Layout from "../components/Loyout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import { toast } from "react-hot-toast";

function HomePage() {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [furnitures, setFurnitures] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setloading] = useState(false);

  //Get All categories
  const getAllcategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllcategory();
    getTotal();
  }, []);

  //Get All furnitures
  const getAllFurnitures = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(
        `/api/v1/furniture/furniture-list/${page}`
      );
      setloading(false);
      setFurnitures(data.furnitures);
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  //Get total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/furniture/furniture-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //Load More
  const loadMore = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(
        `/api/v1/furniture/furniture-list/${page}`
      );
      setloading(false);
      setFurnitures([...furnitures, ...data?.furnitures]);
    } catch (error) {
      console.log(error);
    }
  };

  //Handle Filter by category
  const handlefilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || radio.length) getAllFurnitures();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterfurniture();
  }, [checked, radio]);

  //Get filter Furnitures
  const filterfurniture = async () => {
    try {
      const { data } = await axios.post("/api/v1/furniture/filters-furniture", {
        checked,
        radio,
      });
      setFurnitures(data?.furnitures);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row mt-3">
        <div className="col-md-3">
          <h3 className="text-center"> Filter By Category</h3>
          <div className="d-flex flex-column m-4">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handlefilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h3 className="text-center"> Filter By Price</h3>
          <div className="d-flex flex-column m-4">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((f) => (
                <div key={f._id}>
                  <Radio value={f.array}>{f.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h3 className="text-center">All Furnitures</h3>
          <div className="d-flex flex-wrap p-5">
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
                  <p className="card-text">
                    {f.description.substring(0, 90)}...
                  </p>
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
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, f])
                      );
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
          <div className="m-2 p-3">
            {furnitures && furnitures.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading" : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
