import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = ({ element }) => {
  const role = useSelector((state) => state?.auth?.auth?.user?.Role);
  console.log(role,'role')

  return role === "user" ? element : <Navigate to="/login" replace />;
};
export default UserRoute;
