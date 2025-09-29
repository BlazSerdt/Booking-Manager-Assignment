import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./routes/auth/login";
import RegisterPage from "./routes/auth/register";
import DashboardPage from "./routes/app/dashboard";
import NotFoundPage from "./routes/not-found.tsx";
import { ProtectedRoute } from "../components/auth/ProtectedRoute.tsx";
import LocationsPage from "./routes/app/locations.tsx";
import LocationDetailsPage from "./routes/app/locationDetails.tsx";

export const AppRouter = ()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/app/dashboard"
          element={
            <ProtectedRoute roles={["super_admin", "tenant_admin"]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        {/*<Route
          path="/app/locations"
          element={
            <ProtectedRoute roles={["super_admin", "tenant_admin"]}>
              <LocationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/locations/:id"
          element={
            <ProtectedRoute roles={["super_admin", "tenant_admin"]}>
              <LocationDetailsPage />
            </ProtectedRoute>
          }
        />*/}

        <Route path="/app/locations" element={<LocationsPage />} />
        <Route path="/app/locations/:id" element={<LocationDetailsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}