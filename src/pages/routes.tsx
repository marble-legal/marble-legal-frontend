import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/login/Login";
import Register from "./auth/register/Register";
import { Main } from "./main";
import ResetPassword from "./auth/reset-password/ResetPassword";
import ForgotPassword from "./auth/forgot-password/ForgotPassword";

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route element={<Main />}>
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
