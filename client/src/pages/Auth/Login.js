import React, { useState } from "react";
import Layout from "../../components/Loyout/Layout";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          toast.success(res.data && res.data.message);
        }, 100);
        const dashboard = JSON.parse(localStorage.getItem("auth"));
        navigate(
          location.state ||
            `/dashboard/${dashboard?.user.role === 1 ? "admin" : "user"}`
        );
      } else {
        setTimeout(() => {
          toast.error(res.data.message);
        }, 100);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Login Form"}>
      <div className="form-container" style={{ minHeight: "76vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="password"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <span style={{ fontSize: "15px", textAlign: "right" }}>
            Forget Password ? <Link to={"/forget-password"}>Click here</Link>
          </span>
          <br />
          <span style={{ fontSize: "15px", textAlign: "right" }}>
            Create new account ? <Link to={"/register"}>Register</Link>
          </span>
          <br />
          <br />
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>{" "}
    </Layout>
  );
};

export default Login;
