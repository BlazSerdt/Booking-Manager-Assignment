import { type ReactNode } from "react";

export type AppProviderProps = {
  children: ReactNode;
};

export type AuthProviderProps = {
  children: ReactNode;
}

export interface ProtectedRouteProps {
  children: ReactNode;
  roles?: Role[];
}

export type Role = "super_admin" | "tenant_admin";

export interface User {
  id: string;
  displayName: string;
  email: string;
  password: string;
  role: Role;
}