import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Terms from "./pages/Terms";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageCategory from "./pages/Admin/ManageCategory";
import AddFurniture from "./pages/Admin/AddFurniture";
import Users from "./pages/Admin/Users";
import Profile from "./pages/User/Profile";
import Orders from "./pages/User/Orders";
import Furnitures from "./pages/Admin/Furnitures";
import UpdateFurniture from "./pages/Admin/UpdateFurniture";
import Search from "./pages/Search";
import FurnitureDetails from "./pages/FurnitureDetails";
import Categories from "./pages/Categories";
import CategoryFurniture from "./pages/CategoryFurniture";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/furniture/:slug" element={<FurnitureDetails />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Category/:slug" element={<CategoryFurniture />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dashboard">
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard">
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<ManageCategory />} />
          <Route path="admin/furnitures" element={<Furnitures />} />
          <Route path="admin/add-furniture" element={<AddFurniture />} />
          <Route
            path="admin/update-furniture/:slug"
            element={<UpdateFurniture />}
          />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
