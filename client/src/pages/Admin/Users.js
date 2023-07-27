import React from "react";
import Layout from "../../components/Loyout/Layout";
import AdminMenu from "../../components/Loyout/AdminMenu";

const Users = () => {
  return (
    <Layout title={"Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>All Users</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
