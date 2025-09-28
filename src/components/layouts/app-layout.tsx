import type { AppLayoutProps } from "../../types";
import { Menubar } from "primereact/menubar";
import { Menu } from "primereact/menu";
import { useRef, useState } from "react";
import { useAuth } from "../auth/auth.tsx";
import { Sidebar } from "primereact/sidebar";
import { MenuButton } from "../ui/MenuButton.tsx";
import { SearchBar } from "../ui/SearchBar.tsx";

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { logout } = useAuth();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const menuRef = useRef<Menu>(null);
  const userMenuItems = [
    { label: "Profile", icon: "pi pi-user" },
    { label: "Settings", icon: "pi pi-cog" },
    { separator: true },
    { label: "Logout", icon: "pi pi-sign-out", command: logout },
  ];

  const start = (
    <div className="flex items-center justify-center gap-2">
      <button type="button" className="flex items-center justify-center gap-3 p-3 rounded-md cursor-pointer hover:bg-[#edf0fa]">
        <i className="pi pi-th-large" style={{ fontSize: '1.25rem', color: "#898989" }}></i>
        <span>Booking Manager</span>
      </button>
      <button
        type="button" className="flex items-center justify-center p-3 rounded-md cursor-pointer hover:bg-[#edf0fa]"
        onClick={() => setSidebarVisible(true)}
      >
        <i className="pi pi-bars" style={{ fontSize: '1.25rem', color: "#898989" }}></i>
      </button>
    </div>
  );

  const end = (
    <div className="flex items-center justify-center gap-3">
      <SearchBar />
      <button type="button" className="flex items-center justify-center p-3 rounded-md cursor-pointer hover:bg-[#edf0fa]">
        <i className="pi pi-bell" style={{ fontSize: '1.25rem', color: "#898989" }}></i>
      </button>
      <div>
        <Menu model={userMenuItems} popup ref={menuRef} />
        <button
          type="button" className="flex items-center justify-center p-3 rounded-md cursor-pointer hover:bg-[#edf0fa]"
          onClick={(e) => menuRef.current?.toggle(e)}
        >
          <i className="pi pi-user" style={{ fontSize: '1.25rem', color: "#898989" }}></i>
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="flex flex-col min-h-screen w-full"
      style={{ backgroundColor: "var(--surface-ground)" }}
    >
      <Menubar start={start} end={end}/>

      <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)}>
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="mb-1 text-black uppercase text-sm font-semibold">Home</h3>
              <MenuButton icon="pi pi-home" label="Dashboard" />
            </div>

            <div>
              <h3 className="mb-1 text-black uppercase text-sm font-semibold">Booking</h3>
              <div className="gap-y-2">
                <MenuButton icon="pi pi-map-marker" label="Locations" />
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
      </Sidebar>

      {children}
    </div>
  )
};