import React, { useState, useEffect } from "react";
import Layout from "./../components/Loyout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Total Furnitures Price
  const totalprice = () => {
    try {
      let total = 0;
      cart?.map((f) => {
        total += +f.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Remove Furnitures
  const removeCartFurniture = (fid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === fid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //Get Payment Gateway
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/furniture/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //Payment Function
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/furniture/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      setTimeout(() => {
        toast.success("Payment Successfull , Order Placed");
      }, 100);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `You Have ${cart?.length} Furnitures in Cart. ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                : `Your Cart is Empty`}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {cart?.map((f) => (
                <div className="row p-2 mb-2 card flex-row" key={f._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/furniture/furniture-photo/${f._id}`}
                      className="card-img-top"
                      alt={f.name}
                    />
                  </div>
                  <div className="col-md-8">
                    <p className="card-title">Name : {f.name}</p>
                    <p className="card-text">
                      Description : {f.description.substring(0, 30)}...
                    </p>
                    <p className="card-text">Price : ₹ {f.price}/-</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        removeCartFurniture(f._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <h2>Cart Summary</h2>
            <hr />
            <h3>Total : {totalprice()}</h3>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h6>Current Address </h6>
                  <h6>{auth?.user?.address}</h6>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/login", { state: `/cart` })}
                    >
                      Please login to checkout
                    </button>
                  )}
                </div>
              </>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={!instance || !auth?.user?.address}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                  <br />
                  <br />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
