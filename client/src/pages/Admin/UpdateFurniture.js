import React, { useState, useEffect } from "react";
import Layout from "../../components/Loyout/Layout";
import AdminMenu from "../../components/Loyout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const UpdateFurniture = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [ratings, setRatings] = useState("");

  const [id, setId] = useState("");

  //Get Single Furniture
  const getSingleFurniture = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/furniture/single-furniture/${params.slug}`
      );
      setName(data.furniture.name);
      setDescription(data.furniture.description);
      setPrice(data.furniture.price);
      setQuantity(data.furniture.quantity);
      setRatings(data.furniture.ratings);
      setShipping(data.furniture.shipping);
      setCategory(data.furniture.category._id);
      setPhoto(data.furniture.photo);
      setId(data.furniture._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleFurniture();
    //eslint-disable-next-line
  }, []);

  //Handle Delete
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure to delete this furniture ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/furniture/delete-furniture/${id}`
      );
      if (data?.success) {
        setTimeout(() => {
          toast.success("Furniture Deleted Successfully");
        }, 100);
        navigate("/dashboard/admin/furnitures");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const furnitureData = new FormData();
      furnitureData.append("name", name);
      photo && furnitureData.append("photo", photo);
      furnitureData.append("description", description);
      furnitureData.append("price", price);
      furnitureData.append("quantity", quantity);
      furnitureData.append("ratings", ratings);
      furnitureData.append("shipping", shipping);
      furnitureData.append("category", category);
      const { data } = await axios.put(
        `/api/v1/furniture/update-furniture/${id}`,
        furnitureData
      );
      if (data?.success) {
        setTimeout(() => {
          toast.success("Furniture Updated Successfully");
        }, 100);
        navigate("/dashboard/admin/furnitures");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //Get All categories
  const getAllcategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting categories");
    }
  };

  useEffect(() => {
    getAllcategory();
  }, []);

  return (
    <Layout title={"Add Furniture"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>Update Furniture</h3>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select the category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Furniture-photo"
                      width={"auto"}
                      height={300}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/furniture/furniture-photo/${id}`}
                      alt="Furniture-photo"
                      width={"auto"}
                      height={300}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Furniture Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={ratings}
                  placeholder="Give an ratings"
                  className="form-control"
                  onChange={(e) => setRatings(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary ms-2" onClick={handleUpdate}>
                  Update Furniture
                </button>
                <button className="btn btn-danger ms-2" onClick={handleDelete}>
                  Delete Furniture
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateFurniture;
