import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import Nurse from "./components/Home/Nurse";
import Patient from "./components/Home/Patient";
import React from "react";
import { AuthGate } from "./AuthGate";
import { ApolloProvider } from "@apollo/react-hooks";
import { useAppApolloClient } from "./config/apolloClient";
import { useAuthRoleToken } from "./config/auth";

import VitalHistory from "./components/Nurse/VitalHistory";
import PatientDailyLogs from "./components/Nurse/PatientDailyLogs";
import VitalSigns from "./components/Nurse/VitalSigns";
import EmergencyAlertHistory from "./components/Nurse/EmergencyAlertHistory";
import MotivationalTips from "./components/Nurse/MotivationalTips";
import EmergencyAlert from "./components/Patient/EmergencyAlert";
import DailyLog from "./components/Patient/DailyLog";
import HealthTips from "./components/Patient/MotivationalTips";

function App() {
  const apolloClient = useAppApolloClient();
  const [authRoleToken] = useAuthRoleToken();

  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        {authRoleToken === "Nurse" ? (
          <Routes>
            <Route
              exact
              path="/"
              element={
                <AuthGate>
                  <Nurse />
                </AuthGate>
              }
            />
            <Route exact path="/vitalSigns" element={<VitalSigns />} />
            <Route exact path="/vitalHistory" element={<VitalHistory />} />
            <Route exact path="/patientDailyLogs" element={<PatientDailyLogs />} />
            <Route
              exact
              path="/emergencyAlertHistory"
              element={<EmergencyAlertHistory />}
            />
            <Route
              exact
              path="/motivationalTipsView"
              element={<MotivationalTips />}
            />
          </Routes>
        ) : (
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
                  <Patient />
                </AuthGate>
              }
            ></Route>
            <Route
              exact
              path="/createalert"
              element={
                <AuthGate>
                  <EmergencyAlert />
                </AuthGate>
              }
            ></Route>
            <Route
              exact
              path="/createdailylog"
              element={
                <AuthGate>
                  <DailyLog />
                </AuthGate>
              }
            ></Route>
            <Route
              exact
              path="/tips"
              element={
                <AuthGate>
                  <HealthTips />
                </AuthGate>
              }
            ></Route>
          </Routes>
        )}
      </BrowserRouter>
    </ApolloProvider>
  );
}
export default App;
