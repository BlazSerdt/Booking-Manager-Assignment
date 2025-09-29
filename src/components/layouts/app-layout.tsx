import { Sidebar } from "primereact/sidebar";
import { Topbar } from "../ui/appLayout/Topbar.tsx";
import { useState } from "react";
import type { AppLayoutProps } from "../../types";
import {SidebarContent} from "../ui/appLayout/SidebarContent.tsx";

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      <Topbar onSidebarToggle={() => setSidebarVisible(true)} />

      <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)}>
        <SidebarContent />
      </Sidebar>

      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};
