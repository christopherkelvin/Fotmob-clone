import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const ProtectedRoutes = () => {
    const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};
export const ProtectedLogin = () => {
    const { user } = useAuth();
    return user ? <Navigate to="/" /> : <Outlet />;
}

