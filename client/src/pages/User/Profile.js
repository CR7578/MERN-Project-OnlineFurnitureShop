import Layout from "../../components/Loyout/Layout";
import UserMenu from "../../components/Loyout/UserMenu";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //Get User Data
  useEffect(() => {
    const { email, name, phone, address, password } = auth.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
    setPassword();
  }, [auth?.user]);

  //Upadte Profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Layout title={"Users"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3">
                <h3>User's Profile</h3>
                <div className="form-container" style={{ minHeight: "76vh" }}>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        id="name"
                        placeholder="Enter Your Name"
                        autoFocus
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        id="email"
                        placeholder="Enter Your Email "
                        disabled
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
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control"
                        id="phone"
                        placeholder="Enter Your Phone"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control"
                        id="address"
                        placeholder="Enter Your Address"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      UPDATE
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
