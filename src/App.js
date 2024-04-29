import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routing
import Routes1 from "routes";

// defaultTheme
import themes from "themes";

// project imports
import NavigationScroll from "layout/NavigationScroll";
import 'react-notifications/lib/notifications.css';
import NotificationContainer from "react-notifications/lib/NotificationContainer";

// ==============================|| APP ||============================== //

const App = ({ history }) => {
  const customization = useSelector((state) => state.customization);


  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          {/* <Routes>
            <Route excat path="/login" element={<Login />} />
            <AuthRoute history={history} />
            <Route path="/login" element={<Navigate to="/login" />} />
            
            <Routes1 />
          </Routes> */}
          <NotificationContainer />
          <Routes1 />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
