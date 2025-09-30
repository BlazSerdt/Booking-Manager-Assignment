import { authHandlers } from "./handlers/authHandlers.tsx";
import { locationHandlers } from "./handlers/locationHandlers.tsx";
import { reservationHandlers } from "./handlers/reservationHandlers.tsx";

export const handlers = [
  ...authHandlers,
  ...locationHandlers,
  ...reservationHandlers,
];