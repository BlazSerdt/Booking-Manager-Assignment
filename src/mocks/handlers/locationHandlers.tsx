import { http, HttpResponse } from "msw";
import { v4 as uuid } from "uuid";
import type { Location } from "../../types";

const locations: Location[] = [
  {
    id: "stanovanje_id",
    tenantId: "tenant_admin",
    name: "Stanovanje",
    address: "Slovenska ulica 4",
    city: "Murska Sobota",
    country: "Slovenia",
    timezone: "Berlin/Germany",
    qrCodeValue: "QR-Stanovanje-Slovenska ulica 4-Murska Sobota",
    notes: "Razgled nad mestom",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    name: "Hiša ob reki",
    address: "Rečna ulica 12",
    city: "Ljubljana",
    country: "Slovenia",
    timezone: "Berlin/Germany",
    qrCodeValue: "QR-Hiša ob reki-Rečna ulica 12-Ljubljana",
    notes: "Ob reki s čudovitim vrtom",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    name: "Apartma v centru",
    address: "Trg republike 1",
    city: "Maribor",
    country: "Slovenia",
    timezone: "Berlin/Germany",
    qrCodeValue: "QR-Apartma v centru-Trg republike 1-Maribor",
    notes: "Bližina trgovin in kavarn",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    name: "Brunarica",
    address: "Gorska pot 7",
    city: "Kranjska Gora",
    country: "Slovenia",
    timezone: "Berlin/Germany",
    qrCodeValue: "QR-Brunarica-Gorska pot 7-Kranjska Gora",
    notes: "Idilična brunarica v gorah",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    name: "Vila ob jezeru",
    address: "Jezerska cesta 10",
    city: "Bled",
    country: "Slovenia",
    timezone: "Berlin/Germany",
    qrCodeValue: "QR-Vila ob jezeru-Jezerska cesta 10-Bled",
    notes: "Sprostitev ob čudovitem Blejskem jezeru",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    name: "Penthouse",
    address: "Glavna ulica 22",
    city: "Celje",
    country: "Slovenia",
    timezone: "Berlin/Germany",
    qrCodeValue: "QR-Penthouse-Glavna ulica 22-Celje",
    notes: "Modern penthouse z razgledom",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    name: "Kmečka hiša",
    address: "Poljska cesta 15",
    city: "Ptuj",
    country: "Slovenia",
    timezone: "Berlin/Germany",
    qrCodeValue: "QR-Kmečka hiša-Poljska cesta 15-Ptuj",
    notes: "Tradicionalna kmečka hiša s srcem",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    name: "Loft",
    address: "Industrijska ulica 3",
    city: "Novo mesto",
    country: "Slovenia",
    timezone: "Berlin/Germany",
    qrCodeValue: "QR-Loft-Industrijska ulica 3-Novo mesto",
    notes: "Sodobni loft v industrijskem stilu",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    name: "Obmorska hiša",
    address: "Morska ulica 8",
    city: "Piran",
    country: "Slovenia",
    timezone: "Berlin/Germany",
    qrCodeValue: "QR-Obmorska hiša-Morska ulica 8-Piran",
    notes: "Hiša z razgledom na morje",
  },
  {
    id: uuid(),
    tenantId: "tenant_admin",
    name: "Planinska koča",
    address: "Planinska pot 5",
    city: "Logarska dolina",
    country: "Slovenia",
    timezone: "Berlin/Germany",
    qrCodeValue: "QR-Planinska koča-Planinska pot 5-Logarska dolina",
    notes: "Koča sredi narave in gora",
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