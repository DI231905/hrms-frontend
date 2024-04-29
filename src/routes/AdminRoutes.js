import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import AuthRoute from "routes/Guard/AuthRoute";
import UserRoute from "routes/Guard/UserRoute";
import NotFound from "ui-component/NotFound";
import { Navigate } from "react-router-dom";
import { element } from "prop-types";
import User from "views/AdminPages/user";
import UserFrom from "views/AdminPages/user/UserFrom";
// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("views/dashboard/Default"))
);

const Dashboard = Loadable(lazy(() => import("views/AdminPages/dashboard")));

// ==============================|| ADMIN ROUTING ||============================== //

const AdminRoutes = {
  path: "/admin",
  element: <MainLayout />,
  children: [
    {
      path: "/admin/dashboard",
      element: <AuthRoute element={<Dashboard />} />,
    },
    {
      path: "/admin/config/user",
      element: <AuthRoute element={<User />} />,
    },
    {
      path: "/admin/config/user/create",
      element: <AuthRoute element={<UserFrom />} />,
    },
    {
      path: "/admin/config/user/edit/:id",
      element: <AuthRoute element={<UserFrom />} />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export default AdminRoutes;
