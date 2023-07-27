import React, { useState, useEffect } from "react";
import Layout from "../components/Loyout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const FurnitureDetails = () => {
  const params = useParams();
  const [furniture, setFurniture] = useState({});
  const [relatedFurnitures, setRelatedFurnitures] = useState([]);

  //Inital Furniture details
  useEffect(() => {
    if (params?.slug) getfurniture();
  }, [params?.slug]);

  //get Furniture
  const getfurniture = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/furniture/single-furniture/${params.slug}`
      );
      setFurniture(data?.furniture);
      getSimilarfurnitures(data?.furniture._id, data?.furniture.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //Get Similar Furnitures
  const getSimilarfurnitures = async (fid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/furniture/related-furniture/${fid}/${cid}`
      );
      setRelatedFurnitures(data?.furnitures);
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomStars = () => {
    const minStars = 3;
    const maxStars = 5;
    const numStars =
      Math.floor(Math.random() * (maxStars - minStars + 1)) + minStars;
    return "⭐️".repeat(numStars);
  };

  return (
    <Layout>
      <div className="row container m-4">
        <div className="col-md-5">
          <img
            width={"auto"}
            height={300}
            src={`/api/v1/furniture/furniture-photo/${furniture._id}`}
            className="card-img-top"
            alt={furniture.name}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Fruniture Details</h1>
          <h5>Name: {furniture.name}</h5>
          <h5>Description: {furniture.description}</h5>
          <h5>Price: {furniture.price}</h5>
          <h5>Category: {furniture.category?.name}</h5>
          <h6>Rate: {getRandomStars()}</h6>
          <button className="btn btn-secondary ms-2">Add to cart</button>
        </div>
      </div>
      <hr />
      <div className="row container m-4">
        <h1>Similar Furnitures</h1>
        {relatedFurnitures < 1 && <p>NO Similar Furnitures</p>}
        <div className="d-flex flex-wrap">
          {relatedFurnitures?.map((f) => (
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
                <p className="card-text">{f.description.substring(0, 30)}...</p>
                <p className="card-text">₹ {f.price}/-</p>
                <p>Ratings : {getRandomStars()}</p>

                <button className="btn btn-secondary ms-2">Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FurnitureDetails;
