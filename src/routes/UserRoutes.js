import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import AuthRoute from "routes/Guard/AuthRoute";
import UserRoute from "routes/Guard/UserRoute";
import NotFound from "ui-component/NotFound";

// dashboard routing
const Dashboard = Loadable(lazy(() => import("views/UserPages/dashboard")));
const SamplePage = Loadable(lazy(() => import("views/sample-page")));

// ==============================|| ADMIN ROUTING ||============================== //

const UserRoutes = {
  path: "/user",
  element: <MainLayout />,
  children: [
    {
      path: "/user/dashboard",
      element: <UserRoute element={<Dashboard />} />,
    },
    {
      path: '*',
      element: <NotFound />
    }
  ],
};

export default UserRoutes;



