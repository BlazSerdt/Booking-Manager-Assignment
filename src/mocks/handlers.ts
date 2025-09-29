import { authHandlers } from "./handlers/authHandlers.tsx";
import { locationHandlers } from "./handlers/locationHandlers.tsx";

export const handlers = [
  ...authHandlers,
  ...locationHandlers
];