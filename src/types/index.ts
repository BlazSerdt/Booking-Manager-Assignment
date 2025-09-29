import { type ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
}

export type AppProviderProps = ChildrenProps;
export type AuthProviderProps = ChildrenProps;
export type AppLayoutProps = ChildrenProps;

export interface TopbarProps {
  onSidebarToggle: () => void;
}

export interface ProtectedRouteProps extends ChildrenProps {
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

export interface Location {
  id: string;
  tenantId: string;
  name: string;
  address: string;
  city: string;
  country: string;
  timezone: string;
  qrCodeValue: string;
  notes: string;
}

export type LocationDetailsTabContentProps = {
  name: string;
  address: string;
  city: string;
  country: string;
  timezone: string;
};