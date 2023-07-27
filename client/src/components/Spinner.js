import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import load from "./loading.json";
import Lottie from "lottie-react";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
        path,
      });
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <>
      <div
        className="d-flex fles-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div style={{ width: "20%" }}>
          <Lottie animationData={load} loop={true} />
        </div>
      </div>
    </>
  );
};

export default Spinner;
