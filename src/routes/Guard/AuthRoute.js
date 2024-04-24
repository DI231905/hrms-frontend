// AuthRoute.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ element }) => {
  const role = useSelector((state) => state?.auth?.auth?.user?.Role);
  console.log(role,'role')


  return role === "admin" ? element : <Navigate to="/login" replace />;
};

export default AuthRoute;
