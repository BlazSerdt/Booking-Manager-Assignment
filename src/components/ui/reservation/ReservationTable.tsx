import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { SearchBar } from "../SearchBar.tsx";
import type { Reservation } from "../../../types";
import {useState} from "react";
import {type ReservationFormData, ReservationFormDialog} from "./ReservationFormDialog.tsx";

export const ReservationTable = () => {
  const reservations = [
    {
      id: "1",
      tenantId: "1",
      locationId: "1",
      guestName: "John Doe",
      guestPhone: "123-456-7890",
      guestEmail: "john@example.com",
      checkIn: "01/10/2025",
      checkOut: "05/10/2025",
      status: "Booked",
    },
    {
      id: "2",
      tenantId: "1",
      locationId: "1",
      guestName: "Alice Smith",
      guestPhone: "051-406-8120",
      guestEmail: "alice@example.com",
      checkIn: "07/10/2025",
      checkOut: "10/10/2025",
      status: "Checked in",
    },
    {
      id: "3",
      tenantId: "1",
      locationId: "1",
      guestName: "Bob Johnson",
      guestPhone: "987-654-3210",
      guestEmail: "bob@gmail.com",
      checkIn: "12/10/2025",
      checkOut: "15/10/2025",
      status: "Cancelled",
    },
    {
      id: "4",
      tenantId: "1",
      locationId: "1",
      guestName: "John Doe",
      guestPhone: "123-456-7890",
      guestEmail: "john@example.com",
      checkIn: "01/10/2025",
      checkOut: "05/10/2025",
      status: "Booked",
    },
    {
      id: "5",
      tenantId: "1",
      locationId: "1",
      guestName: "Alice Smith",
      guestPhone: "051-406-8120",
      guestEmail: "alice@example.com",
      checkIn: "07/10/2025",
      checkOut: "10/10/2025",
      status: "Checked in",
    },
    {
      id: "6",
      tenantId: "1",
      locationId: "1",
      guestName: "Bob Johnson",
      guestPhone: "987-654-3210",
      guestEmail: "bob@gmail.com",
      checkIn: "12/10/2025",
      checkOut: "15/10/2025",
      status: "Cancelled",
    },
    {
      id: "7",
      tenantId: "1",
      locationId: "1",
      guestName: "John Doe",
      guestPhone: "123-456-7890",
      guestEmail: "john@example.com",
      checkIn: "01/10/2025",
      checkOut: "05/10/2025",
      status: "Booked",
    },
    {
      id: "8",
      tenantId: "1",
      locationId: "1",
      guestName: "Alice Smith",
      guestPhone: "051-406-8120",
      guestEmail: "alice@example.com",
      checkIn: "07/10/2025",
      checkOut: "10/10/2025",
      status: "Checked in",
    },
    {
      id: "9",
      tenantId: "1",
      locationId: "1",
      guestName: "Bob Johnson",
      guestPhone: "987-654-3210",
      guestEmail: "bob@gmail.com",
      checkIn: "12/10/2025",
      checkOut: "15/10/2025",
      status: "Cancelled",
    },
  ];

  const [createDialogVisible, setCreateDialogVisible] = useState(false);

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
        <Column field="checkIn" header="Check-In" />
        <Column field="checkOut" header="Check-Out" />
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