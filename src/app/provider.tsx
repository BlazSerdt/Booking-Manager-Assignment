import type { AppProviderProps } from "../types";
import { AuthProvider } from "../components/auth/auth.tsx";

export const AppProvider = ({ children }: AppProviderProps)=> {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}