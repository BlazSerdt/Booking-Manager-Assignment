import { MenuButton } from "../MenuButton.tsx";
import { useNavigate } from "react-router";

export const SidebarContent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <h3 className="mb-1 text-black uppercase text-sm font-semibold">Home</h3>
          <MenuButton icon="pi pi-home" label="Dashboard" onClick={() => navigate("/app/dashboard")}/>
        </div>

        <div>
          <h3 className="mb-1 text-black uppercase text-sm font-semibold">Booking</h3>
          <div className="gap-y-2">
            <MenuButton icon="pi pi-map-marker" label="Locations" onClick={() => navigate("/app/locations")} />
            <MenuButton icon="pi pi-calendar" label="Reservations" />
            <MenuButton icon="pi pi-envelope" label="Requests" />
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-black uppercase text-sm font-semibold">Communication</h3>
          <MenuButton icon="pi pi-comments" label="Chat" />
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-200">
        <MenuButton icon="pi pi-cog" label="Settings" />
      </div>
    </div>
  );
}