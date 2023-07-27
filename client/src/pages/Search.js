import React from "react";
import Layout from "./../components/Loyout/Layout";
import { useSearch } from "../context/Search";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Furnitures Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values.results.map((f) => (
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
                      // navigate(`/furniture/${f.slug}`);
                    }}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-2"
                    // onClick={() => {
                    //   setCart([...cart, f]);
                    //   localStorage.setItem(
                    //     "cart",
                    //     JSON.stringify([...cart, f])
                    //   );
                    //   toast.success("Furniture Added to Cart");
                    // }}
                    disabled={f.quantity < 1}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
