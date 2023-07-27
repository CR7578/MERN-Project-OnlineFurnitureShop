import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="list-group">
        <h4>Admin Panel</h4>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
        >
          Manage Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/Add-furniture"
          className="list-group-item list-group-item-action"
        >
          Add Furniture
        </NavLink>
        <NavLink
          to="/dashboard/admin/furnitures"
          className="list-group-item list-group-item-action"
        >
          View All Furnitures
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action"
        >
          View All Orders
        </NavLink>

        {/* <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink> */}
      </div>
    </>
  );
};

export default AdminMenu;
