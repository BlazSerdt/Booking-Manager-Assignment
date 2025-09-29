import { useRef } from "react";
import { Menu } from "primereact/menu";
import { useAuth } from "../../auth/auth.tsx";
import { SearchBar } from "../SearchBar.tsx";
import type { TopbarProps } from "../../../types";
import { useNavigate } from "react-router";

export const Topbar = ({ onSidebarToggle }: TopbarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<Menu>(null);

  const userMenuItems = [
    { label: "Profile", icon: "pi pi-user" },
    { label: "Settings", icon: "pi pi-cog" },
    { separator: true },
    { label: "Logout", icon: "pi pi-sign-out", command: logout },
  ];

  return (
    <div className="flex items-center justify-between bg-white px-4 py-2 shadow-md">
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => navigate("/app/dashboard")}
          className="hidden md:flex items-center justify-center gap-3 p-3 rounded-md cursor-pointer hover:bg-[#edf0fa]"
        >
          <i className="pi pi-th-large" style={{ fontSize: '1.25rem', color: "#898989" }}></i>
          <span>Booking Manager</span>
        </button>

        <button
          type="button"
          className="flex items-center justify-center p-3 rounded-md cursor-pointer hover:bg-[#edf0fa]"
          onClick={onSidebarToggle}
        >
          <i className="pi pi-bars" style={{ fontSize: '1.25rem', color: "#898989" }}></i>
        </button>
      </div>


      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <SearchBar />
        </div>

        <button className="flex items-center justify-center relative p-3 rounded-md cursor-pointer hover:bg-[#edf0fa]">
          <i className="pi pi-bell" style={{ fontSize: '1.25rem', color: "#898989" }}></i>
          <span className="absolute top-1 right-1 text-xs bg-[#CE3C5E] text-white rounded-full w-4 h-4 flex items-center justify-center">3</span>
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
    </div>
  );
};
