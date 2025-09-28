import { useAuth } from "./auth.tsx";
import type {ProtectedRouteProps} from "../../types";
import {Navigate} from "react-router-dom";

export const ProtectedRoute = ({ children, roles } : ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace/>; // if user not logged in, redirect to login
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace/>; // if user doesnt have correct role, redirect to dashboard

  return children;
}