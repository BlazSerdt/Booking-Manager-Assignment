import { http, HttpResponse } from "msw";
import { v4 as uuid } from "uuid";
import type { User } from "../../types";

const users: User[] = [
  {
    id: "super_admin",
    displayName: "SuperAdmin",
    email: "super_admin@mail.com",
    password: "superadmin",
    role: "super_admin"
  },
  {
    id: "tenant_admin",
    displayName: "TenantAdmin",
    email: "tenant_admin@mail.com",
    password: "tenantadmin",
    role: "tenant_admin"
  },
  {
    id: "tenant_admin2",
    displayName: "TenantAdmin2",
    email: "tenant_admin2@mail.com",
    password: "tenantadmin2",
    role: "tenant_admin"
  },
];

// makes a mock JWT using subject(user id) and user role, and encodes with base64, so it looks similar to a token
function generateMockJWT(user: User) {
  return btoa(JSON.stringify({ sub: user.id, role: user.role }));
}

export const authHandlers = [
  http.post("/api/auth/register", async ({ request }) => {
    const body = (await request.json()) as {
      displayName: string;
      email: string;
      password: string;
    };

    if(!body.displayName || !body.email || !body.password){
      return HttpResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existing = users.find((user) => user.email === body.email);
    if (existing) {
      return HttpResponse.json(
        { message: "Email is already registered" },
        { status: 400 }
      );
    }

    const newUser: User = {
      id: uuid(),
      displayName: body.displayName,
      email: body.email,
      password: body.password,
      role: "tenant_admin" // only tenant admins can register themselves
    }
    users.push(newUser);

    return HttpResponse.json(
      { message: "Successfully registered" },
      { status: 201 }
    );
  }),

  http.post("/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      password: string;
    };

    if(!body.email || !body.password){
      return HttpResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = users.find((user) => user.email === body.email);
    if(!user || user.password !== body.password){
      return HttpResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // generates mock access and refresh tokens
    const accessToken = generateMockJWT(user);
    const refreshToken = "refresh-token-" + user.id;

    return HttpResponse.json(
      {
        user: {
          id: user.id,
          displayName: user.displayName,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      },
      { status: 200 }
    );
  })
];