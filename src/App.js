/* eslint-disable jsx-a11y/alt-text */
import { useMemo } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import DataTable from "./components/pages/DataTable/DataTable";
import HomeWithMaterial from "./components/pages/Home/HomeWithMaterial";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import {Navigation} from "./components/layout/Navigation/Navigation";
import {Footer} from "./components/layout/Footer/Footer";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledProvider } from "./context/StyledContext";
import { useAppContext } from "./context/AppContext";
import { Logout } from "./components/auth/Logout";

function App() {
  const appCtx = useAppContext();
  const { isLogin, user } = useMemo(
    () => ({
      isLogin: appCtx.isLogin,
      user: appCtx.user,
    }),
    [appCtx.isLogin, appCtx.user]
  );

  return (
    <StyledProvider>
      <BrowserRouter>
        <ToastContainer />
        <Navigation user={user} isLogin={isLogin} />
        <main style={{ minHeight: "90vh" }}>
          <Switch>
            {isLogin && (
              <>
                <Redirect from="/" to="/home" />
                <Route path={"/home"} component={HomeWithMaterial} />
                <Route path="/data" component={DataTable} />
                <Route path="/logout" component={Logout} />
                <Redirect to="/home" />
              </>
            )}
            {!isLogin && (
              <>
                <Route exact path="/" component={Login} />
                <Route path="/register" component={Register} />
                <Redirect to="/" />
              </>
            )}
          </Switch>
        </main>

        <Footer />
      </BrowserRouter>
    </StyledProvider>
  );
}

export default App;
