import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import React from "react";
import { AuthGate } from "./AuthGate";
import { ApolloProvider } from "@apollo/react-hooks";
import { useAppApolloClient } from "./config/apolloClient";

function App() {
  const apolloClient = useAppApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/register"
            element={<AuthGate myProp={Register}></AuthGate>}
          ></Route>
          <Route
            exact
            path="/"
            element={
              <AuthGate>
                <Home />
              </AuthGate>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}
export default App;
