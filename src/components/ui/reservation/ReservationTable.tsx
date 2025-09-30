import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { SearchBar } from "../SearchBar.tsx";
import type { Reservation, ReservationTableProps } from "../../../types";
import { useEffect, useState } from "react";
import { type ReservationFormData, ReservationFormDialog } from "./ReservationFormDialog.tsx";
import { useAuth } from "../../auth/auth.tsx";

export const ReservationTable = ({ locationId }: ReservationTableProps) => {
  const { user } = useAuth();
  const tenantId = user?.id;

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [createDialogVisible, setCreateDialogVisible] = useState(false);

  // needed to convert from iso string format (from json) to date object
  const parseReservations = (data: Reservation[]) => {
    return data.map(res => ({
      ...res,
      checkIn: new Date(res.checkIn),
      checkOut: new Date(res.checkOut),
    }));
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (!tenantId || !locationId) return;

    const fetchReservations = async () => {
      try {
        const response = await fetch(`/api/reservations?tenantId=${tenantId}&locationId=${locationId}`);
        
        if (!response.ok) 
          throw new Error("Failed to fetch reservations");
        
        const data: Reservation[] = await response.json();
        setReservations(parseReservations(data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservations();
  }, [tenantId]);

  const handleCreate = (res: ReservationFormData) => {
    console.log(res);
  }

  const statusBodyTemplate = (rowData: Reservation) => {
    let severity: "success" | "info" | "warning" | "danger" = "info";
    switch (rowData.status) {
      case "Booked":
        severity = "info";
        break;
      case "Checked in":
        severity = "success";
        break;
      case "Checked out":
        severity = "warning";
        break;
      case "Cancelled":
        severity = "danger";
        break;
    }
    return (
      <div className="flex justify-center">
        <Tag value={rowData.status} severity={severity} />
      </div>
    )
  };

  const tableHeader = (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">Manage Reservations</h3>
      <div className="flex gap-2 items-center justify-center">
        <SearchBar />
        <Button
          icon="pi pi-plus-circle"
          label="New reservation"
          severity="success"
          onClick={() => setCreateDialogVisible(true)}
        />
      </div>
    </div>
  );

  return (
    <>
      <DataTable
        value={reservations}
        paginator
        rows={7}
        header={tableHeader}
        className="rounded-xl overflow-hidden cursor-pointer"
      >
        <Column field="guestName" header="Guest Name"/>
        <Column field="guestPhone" header="Phone" />
        <Column field="guestEmail" header="Email" />
        <Column field="checkIn" header="Check-In" body={(rowData) => formatDate(rowData.checkIn)} />
        <Column field="checkOut" header="Check-Out" body={(rowData) => formatDate(rowData.checkOut)} />
        <Column header="Status" alignHeader="center" body={statusBodyTemplate} />
      </DataTable>

      <ReservationFormDialog
        visible={createDialogVisible}
        onHide={() => setCreateDialogVisible(false)}
        onSave={handleCreate}
      />

    </>
  );
};