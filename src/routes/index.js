import { useRoutes ,useNavigate } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import NotFound from "ui-component/NotFound";

// ==============================|| ROUTING RENDER ||============================== //

export default function AuthRoute(props) {


  return <>{useRoutes([AdminRoutes, UserRoutes, AuthenticationRoutes])}</>;
}
