import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import Nurse from "./components/Home/Nurse";
import Patient from "./components/Home/Patient";
import React from "react";
import { AuthGate } from "./AuthGate";
import { ApolloProvider } from "@apollo/react-hooks";
import { useAppApolloClient } from "./config/apolloClient";
import { gql, useQuery } from "@apollo/client";
import { useAuthToken, useAuthUserToken,useAuthRoleToken } from "./config/auth";


function App() {
  const apolloClient = useAppApolloClient();
  const [authRoleToken] = useAuthRoleToken();

  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/register"
            element={<AuthGate myProp={Register}></AuthGate>}
          ></Route>
          {authRoleToken === "Nurse"?(
          <Route
            exact
            path="/"
            element={
              <AuthGate>
                <Nurse />
              </AuthGate>
            }
          ></Route>): (
          <Route
            exact
            path="/"
            element={
              <AuthGate>
                <Patient />
              </AuthGate>
            }
          ></Route>)}
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}
export default App;
