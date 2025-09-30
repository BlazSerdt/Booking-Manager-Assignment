import { http, HttpResponse } from "msw";
import { v4 as uuid } from "uuid";
import type { Location } from "../../types";

export const locations: Location[] = [
  {
    id: uuid(),
    tenantId: "tenant_admin",
    name: "Mountain Cabin",
    address: "123 Alpine Rd",
    city: "Denver",
    country: "USA",
    timezone: "Mountain/US",
    qrCodeValue: "QR-Mountain-Cabin-123 Alpine Rd-Denver",
    notes: "Cozy cabin in the mountains.",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    name: "Beach House",
    address: "456 Ocean Drive",
    city: "Miami",
    country: "USA",
    timezone: "Eastern/US",
    qrCodeValue: "QR-Beach-House-456 Ocean Drive-Miami",
    notes: "Modern beach house with sea view.",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    name: "City Apartment",
    address: "789 Main Street",
    city: "London",
    country: "UK",
    timezone: "London/UK",
    qrCodeValue: "QR-City-Apartment-789 Main Street-London",
    notes: "Stylish apartment in the heart of London.",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    name: "Desert Villa",
    address: "12 Sunset Blvd",
    city: "Dubai",
    country: "UAE",
    timezone: "Dubai/UAE",
    qrCodeValue: "QR-Desert-Villa-12 Sunset Blvd-Dubai",
    notes: "Luxury villa with private pool in the desert.",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    name: "Tokyo Loft",
    address: "34 Sakura Street",
    city: "Tokyo",
    country: "Japan",
    timezone: "Tokyo/Japan",
    qrCodeValue: "QR-Tokyo-Loft-34 Sakura Street-Tokyo",
    notes: "Compact loft in the center of Tokyo.",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    name: "Sydney Harbour Apartment",
    address: "56 Harbour Road",
    city: "Sydney",
    country: "Australia",
    timezone: "Sydney/Australia",
    qrCodeValue: "QR-Sydney-Harbour-56 Harbour Road-Sydney",
    notes: "Apartment with stunning views of Sydney Harbour.",
  },
];

export const locationHandlers = [
  // SELECT ONE
  http.get("/api/locations/:id", ({ params }) => {
    const { id } = params;
    const location = locations.find((loc) => loc.id === id);

    if (!location) {
      return HttpResponse.json({ message: "Location not found" }, { status: 404 });
    }

    return HttpResponse.json(location, { status: 200 });
  }),

  // SELECT ALL
  http.get("/api/locations", ({ request }) => {
    const url = new URL(request.url);
    const tenantId = url.searchParams.get("tenantId");

    if (!tenantId) {
      return HttpResponse.json(
        { message: "Missing tenantId" },
        { status: 400 }
      );
    }

    const tenantLocations = locations.filter(locs => locs.tenantId === tenantId);
    return HttpResponse.json(tenantLocations, { status: 200 });
  }),

  // CREATE
  http.post("/api/locations", async ({ request }) => {
    const body = (await request.json()) as {
      tenantId: string,
      name: string,
      address: string,
      city: string,
      country: string,
      timezone: string,
      notes: string,
    };

    if (!body.tenantId || !body.name || !body.address || !body.city || !body.country || !body.timezone) {
      return HttpResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newLocation: Location = {
      id: uuid(),
      tenantId: body.tenantId,
      name: body.name,
      address: body.address,
      city: body.city,
      country: body.country,
      timezone: body.timezone,
      qrCodeValue: `QR-${body.name}-${body.address}-${body.city}`,
      notes: body.notes,
    };

    locations.push(newLocation);

    return HttpResponse.json({ newLocation }, { status: 201 });
  }),

  // UPDATE
  http.put("/api/locations/:id", async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as {
      name: string;
      address: string;
      city: string;
      country: string;
      timezone: string;
      notes: string;
    };

    const index = locations.findIndex(loc => loc.id === id);
    if (index === -1) {
      return HttpResponse.json(
        { message: "Location not found" },
        { status: 404 }
      );
    }

    locations[index].name = body.name;
    locations[index].address = body.address;
    locations[index].city = body.city;
    locations[index].country = body.country;
    locations[index].timezone = body.timezone;
    locations[index].qrCodeValue = `QR-${body.name}-${body.address}-${body.city}`
    locations[index].notes = body.notes;

    return HttpResponse.json(locations[index], { status: 200 });
  }),

  // DELETE
  http.delete("/api/locations/:id", ({ params }) => {
    const { id } = params;
    const index = locations.findIndex(loc => loc.id === id);

    if (index === -1) {
      return HttpResponse.json(
        { message: "Location not found" },
        { status: 404 }
      );
    }

    locations.splice(index, 1);
    return HttpResponse.json({ message: "Location deleted" }, { status: 200 });
  }),
];