import React, { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "antd";

import Home from "./pages/Home";
import LostItem from "./pages/LostItem";
import FoundItem from "./pages/FoundItem";
import LoggedIn from "./pages/LoggedIn";
import SignUp from "./pages/SignUp";

import "./App.css";

import { AuthContext } from "./shared/context/auth-context";
import FoundReportForm from "./LostFoundReport/components/FoundReportForm";
import LostReportForm from "./LostFoundReport/components/LostReportForm";
import Navbar from "./shared/Landing/Navbar";
//import Signup from "./user/components/Signup";

let logoutTimer;
const { Content, Footer } = Layout;

const App = () => {
  //const auth = useContext(AuthContext);
  const [token, setToken] = useState(false);
  const [tokenExpirationTime, setTokenExpirationTime] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    setIsLoggedIn(true);
    setToken(token);
    setUserId(uid);
    const tokenExpirationTime =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationTime(tokenExpirationTime);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationTime.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setToken(null);
    setUserId(null);
    setTokenExpirationTime(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationTime) {
      const remainingTime =
        tokenExpirationTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationTime, logout]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <React.Fragment>
        {isLoggedIn ? (
          <Layout>
            <Navbar />
            <Layout>
              <Content style={{ margin: "24px 16px 0" }}>
                <div
                  className="site-layout-background"
                  style={{ padding: 24, minHeight: 540 }} 
                >
                  <Switch>
                    <Route path="/login" exact>
                      <LoggedIn />
                    </Route>

                    <Route path="/signup" exact>
                      <SignUp />
                    </Route>

                    <Route path={`/home/:userId`} exact>
                      <Home />
                    </Route>

                    <Route path={`/lost-report`} exact>
                      <LostItem />
                    </Route>

                    <Route path={`/lost-report/:userId/reportform`} exact>
                      <LostReportForm />
                    </Route>

                    <Route path={`/found-report`} exact>
                      <FoundItem />
                    </Route>

                    <Route path={`/found-report/:userId/reportform`} exact>
                      <FoundReportForm />
                    </Route>
                    <Route path="*" exact>
                      <Redirect to="/login" />
                    </Route>
                  </Switch>
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                © 2022 Lost And Found.All rights reserved.
              </Footer>
            </Layout>
          </Layout>
        ) : (
          // <LoggedIn />
          <>
            <switch>
              <Route path="/login" exact>
                <LoggedIn />
              </Route>

              <Route path="/signup" exact>
                <SignUp />
              </Route>

              <Route path="/" exact>
                <Redirect to="/login" />
              </Route>
            </switch>
          </>
        )}
      </React.Fragment>
    </AuthContext.Provider>
  );
};

export default App;
