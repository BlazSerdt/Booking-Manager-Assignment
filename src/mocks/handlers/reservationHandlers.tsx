import { http, HttpResponse } from "msw";
import { v4 as uuid } from "uuid";
import type { Reservation } from "../../types";
import { locations } from "./locationHandlers.tsx";

const today = new Date();

export const reservations: Reservation[] = [
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[0].id,
    guestName: "John Doe",
    guestPhone: "123-456-780",
    guestEmail: "john@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 1)),
    checkOut: new Date(today.setDate(today.getDate() + 3)),
    status: "Booked",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[0].id,
    guestName: "Alice Smith",
    guestPhone: "987-654-310",
    guestEmail: "alice@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 5)),
    checkOut: new Date(today.setDate(today.getDate() + 7)),
    status: "Checked in",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[0].id,
    guestName: "Bob Johnson",
    guestPhone: "555-123-457",
    guestEmail: "bob@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 9)),
    checkOut: new Date(today.setDate(today.getDate() + 12)),
    status: "Cancelled",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[0].id,
    guestName: "Emily Davis",
    guestPhone: "444-555-666",
    guestEmail: "emily@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 14)),
    checkOut: new Date(today.setDate(today.getDate() + 16)),
    status: "Booked",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[0].id,
    guestName: "Michael Brown",
    guestPhone: "222-333-444",
    guestEmail: "michael@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 18)),
    checkOut: new Date(today.setDate(today.getDate() + 20)),
    status: "Checked out",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[0].id,
    guestName: "Sophia Wilson",
    guestPhone: "777-888-999",
    guestEmail: "sophia@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 22)),
    checkOut: new Date(today.setDate(today.getDate() + 25)),
    status: "Booked",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[1].id,
    guestName: "Liam Taylor",
    guestPhone: "111-222-333",
    guestEmail: "liam@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 2)),
    checkOut: new Date(today.setDate(today.getDate() + 4)),
    status: "Booked",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[1].id,
    guestName: "Olivia Martinez",
    guestPhone: "444-555-777",
    guestEmail: "olivia@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 6)),
    checkOut: new Date(today.setDate(today.getDate() + 9)),
    status: "Checked in",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[1].id,
    guestName: "Noah Anderson",
    guestPhone: "888-999-000",
    guestEmail: "noah@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 10)),
    checkOut: new Date(today.setDate(today.getDate() + 12)),
    status: "Cancelled",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[2].id,
    guestName: "Emma Thomas",
    guestPhone: "123-321-123",
    guestEmail: "emma@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 1)),
    checkOut: new Date(today.setDate(today.getDate() + 3)),
    status: "Booked",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[2].id,
    guestName: "James Jackson",
    guestPhone: "456-654-456",
    guestEmail: "james@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 5)),
    checkOut: new Date(today.setDate(today.getDate() + 7)),
    status: "Checked out",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[3].id,
    guestName: "Charlotte White",
    guestPhone: "555-666-777",
    guestEmail: "charlotte@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 2)),
    checkOut: new Date(today.setDate(today.getDate() + 5)),
    status: "Booked",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[3].id,
    guestName: "Henry Lewis",
    guestPhone: "888-777-666",
    guestEmail: "henry@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 6)),
    checkOut: new Date(today.setDate(today.getDate() + 8)),
    status: "Checked in",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[3].id,
    guestName: "Amelia Hall",
    guestPhone: "111-222-333",
    guestEmail: "amelia@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 9)),
    checkOut: new Date(today.setDate(today.getDate() + 11)),
    status: "Cancelled",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[4].id,
    guestName: "Lucas Young",
    guestPhone: "444-555-666",
    guestEmail: "lucas@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 1)),
    checkOut: new Date(today.setDate(today.getDate() + 3)),
    status: "Booked",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[4].id,
    guestName: "Mia King",
    guestPhone: "777-888-999",
    guestEmail: "mia@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 4)),
    checkOut: new Date(today.setDate(today.getDate() + 6)),
    status: "Checked in",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[5].id,
    guestName: "Ethan Scott",
    guestPhone: "222-333-444",
    guestEmail: "ethan@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 2)),
    checkOut: new Date(today.setDate(today.getDate() + 5)),
    status: "Booked",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[5].id,
    guestName: "Ava Green",
    guestPhone: "555-666-777",
    guestEmail: "ava@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 6)),
    checkOut: new Date(today.setDate(today.getDate() + 8)),
    status: "Checked out",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    locationId: locations[5].id,
    guestName: "William Adams",
    guestPhone: "888-999-000",
    guestEmail: "william@example.com",
    checkIn: new Date(today.setDate(today.getDate() + 9)),
    checkOut: new Date(today.setDate(today.getDate() + 12)),
    status: "Cancelled",
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

  // CREATE
  http.post("/api/reservations", async ({ request }) => {
    const body = (await request.json()) as {
      tenantId: string,
      locationId: string,
      guestName: string,
      guestPhone: string,
      guestEmail: string,
      checkIn: string,
      checkOut: string,
    };

    if (!body.tenantId || !body.locationId || !body.guestName || !body.guestPhone || !body.guestEmail || !body.checkIn || !body.checkOut) {
      return HttpResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newReservation: Reservation = {
      id: uuid(),
      tenantId: body.tenantId,
      locationId: body.locationId,
      guestName: body.guestName,
      guestPhone: body.guestPhone,
      guestEmail: body.guestEmail,
      checkIn: new Date(body.checkIn),
      checkOut: new Date(body.checkOut),
      status: "Booked",
    };

    console.log(newReservation);
    reservations.push(newReservation);

    return HttpResponse.json({ newReservation }, { status: 201 });
  }),

  // UPDATE
  http.put("/api/reservations/:id", async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as {
      guestName: string,
      guestPhone: string,
      guestEmail: string,
      checkIn: string,
      checkOut: string,
      status: "Booked" | "Checked in" | "Checked out" | "Cancelled";
    };

    const index = reservations.findIndex(res => res.id === id);
    if (index === -1) {
      return HttpResponse.json(
        { message: "Reservation not found" },
        { status: 404 }
      );
    }

    reservations[index].guestName = body.guestName;
    reservations[index].guestPhone = body.guestPhone;
    reservations[index].guestEmail = body.guestEmail;
    reservations[index].checkIn = new Date(body.checkIn);
    reservations[index].checkOut = new Date(body.checkOut);
    reservations[index].status = body.status;

    return HttpResponse.json(reservations[index], { status: 200 });
  }),

  // DELETE
  http.delete("/api/reservations/:id", async ({ params }) => {
    const { id } = params;
    const index = reservations.findIndex(res => res.id === id);

    if (index === -1) {
      return HttpResponse.json(
        { message: "Reservation not found" },
        { status: 404 }
      );
    }

    reservations.splice(index, 1);
    return HttpResponse.json({ message: "Reservation deleted" }, { status: 200 });
  })
]