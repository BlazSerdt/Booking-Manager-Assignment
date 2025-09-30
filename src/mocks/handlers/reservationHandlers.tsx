import { http, HttpResponse } from "msw";
import { v4 as uuid } from "uuid";
import type { Reservation } from "../../types";

export const reservations: Reservation[] = [
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: "stanovanje_id",
    guestName: "John Doe",
    guestPhone: "123-456-780",
    guestEmail: "john@example.com",
    checkIn: new Date(new Date().setDate(new Date().getDate() + 1)),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 3)),
    status: "Booked",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: "stanovanje_id",
    guestName: "Alice Smith",
    guestPhone: "987-654-310",
    guestEmail: "alice@example.com",
    checkIn: new Date(new Date().setDate(new Date().getDate() + 5)),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 8)),
    status: "Checked in",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: "stanovanje_id",
    guestName: "Bob Johnson",
    guestPhone: "555-123-457",
    guestEmail: "bob@example.com",
    checkIn: new Date(new Date().setDate(new Date().getDate() + 9)),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 12)),
    status: "Cancelled",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: "stanovanje_id",
    guestName: "Emily Davis",
    guestPhone: "444-555-666",
    guestEmail: "emily@example.com",
    checkIn: new Date(new Date().setDate(new Date().getDate() + 14)),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 19)),
    status: "Booked",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: "stanovanje_id",
    guestName: "Michael Brown",
    guestPhone: "222-333-444",
    guestEmail: "michael@example.com",
    checkIn: new Date(new Date().setDate(new Date().getDate() + 23)),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 26)),
    status: "Checked out",
  },
];

export const reservationHandlers = [
  // SELECT ALL RESERVATIONS FOR LOCATION
  http.get("/api/reservations", ({ request }) => {
    const url = new URL(request.url);
    const tenantId = url.searchParams.get("tenantId");
    const locationId = url.searchParams.get("locationId");

    if (!tenantId || !locationId) {
      return HttpResponse.json(
        { message: "Missing tenantId or locationId" },
        { status: 400 }
      );
    }

    const filtered = reservations.filter(
      (res) => res.tenantId === tenantId && res.locationId === locationId
    );

    return HttpResponse.json(filtered, { status: 200 });
  }),
]




















