import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/login/Login";
import Register from "./auth/register/Register";
import { Main } from "./main";
import ResetPassword from "./auth/reset-password/ResetPassword";
import ForgotPassword from "./auth/forgot-password/ForgotPassword";
import Dashboard from "./dashboard/Dashboard";
import { Initial } from "./initial";
import Home from "./home/Home";
import ContractAnalysis from "./contract-analysis/ContractAnalysis";
import Subscription from "./subscription/Subscription";
import EntityFormation from "./entity-formation/EntityFormation";
import ContractDraftGeneration from "./contract-draft/ContractDraftGeneration";

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route element={<Initial />}>
        <Route path="home" element={<Home />} />
        <Route path="subscription" element={<Subscription />} />
        <Route
          index
          element={
            // if loggged in redirect to dashboard
            <Navigate to="/login" />
          }
        />
      </Route>
      <Route element={<Main />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="contracts" element={<ContractAnalysis />} />
        <Route path="entity-formation" element={<EntityFormation />} />
        <Route path="draft-generation" element={<ContractDraftGeneration />} />
        <Route
          index
          element={
            // if loggged in redirect to dashboard
            <Navigate to="/login" />
          }
        />
      </Route>
    </Routes>
  );
};
export default RoutesList;
