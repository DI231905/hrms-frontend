// material-ui
import { Typography } from "@mui/material";

// project imports
import NavGroup from "./NavGroup";
import { userMenuItems, adminMenuItems } from "menu-items";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  let menuItem;
  const navigate = useNavigate();
  const role = useSelector((state) => state?.auth?.auth?.user?.Role);
  if (role && role == "admin") {
    menuItem = adminMenuItems;
  } else if (role && role == "user") {
    menuItem = userMenuItems;
  } else {
    navigate('/login')
  }

  const navItems = menuItem && menuItem.items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
