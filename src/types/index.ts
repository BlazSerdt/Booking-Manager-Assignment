import { type ReactNode } from "react";
import type {LocationFormData} from "../components/ui/location/LocationFormDialog.tsx";
import type {ReservationFormData} from "../components/ui/reservation/ReservationFormDialog.tsx";

export type ChildrenProps = {
  children: ReactNode;
}

export type AppProviderProps = ChildrenProps;
export type AuthProviderProps = ChildrenProps;
export type AppLayoutProps = ChildrenProps;

export type TopbarProps = {
  onSidebarToggle: () => void;
}

export interface ProtectedRouteProps extends ChildrenProps {
  roles?: Role[];
}

export interface LocationFormDialogProps {
  visible: boolean;
  onHide: () => void;
  initialLocation?: LocationFormData; // used if opened for editing
  onSave: (data: LocationFormData) => void;
}


export type LocationDetailsTabContentProps = {
  name: string;
  address: string;
  city: string;
  country: string;
  timezone: string;
  notes: string;
};

export type QRTabProps = {
  qrCodeValue: string;
  locationName: string;
}

export interface ReservationFormDialogProps {
  visible: boolean;
  onHide: () => void;
  initialReservation?: ReservationFormData;
  onSave: (data: ReservationFormData) => void;
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

export interface Reservation {
  id: string;
  tenantId: string;
  locationId: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  checkIn: Date;
  checkOut: Date;
  status: "Booked" | "Checked in" | "Checked out" | "Cancelled";
}