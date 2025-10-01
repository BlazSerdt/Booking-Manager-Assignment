import { Column } from "primereact/column";
import { DataTable} from "primereact/datatable";
import { Button } from "primereact/button";
import { SearchBar } from "../SearchBar.tsx";
import type { Reservation, ReservationTableProps} from "../../../types";
import { useEffect, useRef, useState } from "react";
import { type ReservationFormData, ReservationFormDialog } from "./ReservationFormDialog.tsx";
import { useAuth } from "../../auth/auth.tsx";
import { Toast } from "primereact/toast";
import {Dropdown} from "primereact/dropdown";

export const ReservationTable = ({ locationId }: ReservationTableProps) => {
  const { user } = useAuth();
  const tenantId = user?.id;
  const toast = useRef<Toast>(null);

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [createDialogVisible, setCreateDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // needed to convert from iso string format (from json) to date object
  const parseReservation = (res: Reservation): Reservation => ({
    ...res,
    checkIn: new Date(res.checkIn),
    checkOut: new Date(res.checkOut),
  });

  // helper function to format dates in the table
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
        const parsedData = data.map(parseReservation);

        setReservations(parsedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservations();
  }, [locationId, tenantId]);

  const openEditDialog = (res: Reservation) => {
    setSelectedReservation(res);
    setEditDialogVisible(true);
  }

  const handleCreate = async (res: ReservationFormData) => {
    if (!tenantId) return;
    try{
      const body = { tenantId: tenantId, locationId: locationId, ...res };
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok)
        throw new Error("Failed to create reservation");

      const { newReservation } = await response.json();

      setReservations((prev) => [...prev, parseReservation(newReservation)]);
      setCreateDialogVisible(false);

      toast.current?.show({ severity: "success", summary: "Success", detail: "Reservation created!", life: 3000 });
    } catch (err) {
      console.error(err);
      toast.current?.show({ severity: "error", summary: "Error", detail: "Failed to create reservation", life: 3000 });
    }
  }

  const handleEdit = async (res: ReservationFormData) => {
    if (!selectedReservation) return;
    try {
      const response = await fetch(`/api/reservations/${selectedReservation.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(res),
      });

      if (!response.ok)
        throw new Error("Failed to update reservation");

      const updated = await response.json();
      const updatedReservation = parseReservation(updated);

      setReservations((prev) =>
        prev.map((res) => (res.id === selectedReservation.id ? updatedReservation : res))
      );
      setEditDialogVisible(false);
      setSelectedReservation(null);

      toast.current?.show({ severity: "success", summary: "Success", detail: "Reservation updated!", life: 3000 });
    } catch (err) {
      console.error(err);
      toast.current?.show({ severity: "error", summary: "Error", detail: "Failed to edit reservation", life: 3000 });
    }

  };

  const handleDelete = async (res: Reservation) => {
    if (!res.id) return;

    try {
      const response = await fetch(`/api/reservations/${res.id}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error("Failed to delete reservation");

      setReservations((prev) => prev.filter((reservation) => reservation.id !== res.id));

      toast.current?.show({ severity: "success", summary: "Deleted", detail: "Reservation deleted", life: 3000 });
    } catch (err) {
      console.error(err);
      toast.current?.show({ severity: "error", summary: "Error", detail: "Failed to delete reservation", life: 3000 });
    }
  }

  const tableHeader = (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">Manage Reservations</h3>
      <div className="flex gap-2 items-center justify-center">
        <SearchBar onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)} />
        <div className="hidden xl:block">
          <Dropdown
            value={statusFilter}
            options={[
              { label: "All", value: "All" },
              { label: "Booked", value: "Booked" },
              { label: "Checked in", value: "Checked in" },
              { label: "Checked out", value: "Checked out" },
              { label: "Cancelled", value: "Cancelled" },
            ]}
            onChange={(e) => setStatusFilter(e.value)}
            placeholder="Filter by Status"
            className="w-48"
          />
        </div>
        <Button
          severity="success"
          onClick={() => setCreateDialogVisible(true)}
        >
          <div className="flex sm:hidden items-center gap-2 font-semibold">
            <i className="pi pi-plus-circle"></i>
            <span>New</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-semibold">
            <i className="pi pi-plus-circle"></i>
            <span>New reservation</span>
          </div>
        </Button>
      </div>
    </div>
  );

  const statusBodyTemplate = (res: Reservation) => {
    let bgColor = "bg-gray-200";
    let textColor = "text-gray-800";

    switch (res.status) {
      case "Booked":
        bgColor = "bg-blue-200";
        textColor = "text-blue-800";
        break;
      case "Checked in":
        bgColor = "bg-green-200";
        textColor = "text-green-800";
        break;
      case "Checked out":
        bgColor = "bg-yellow-200";
        textColor = "text-yellow-800";
        break;
      case "Cancelled":
        bgColor = "bg-red-200";
        textColor = "text-red-800";
        break;
    }

    return (
      <div className="flex justify-center">
        <div
          className={`${bgColor} ${textColor} py-1.5 text-center w-full rounded-full text-sm font-semibold`}
        >
          {res.status}
        </div>
      </div>
    );
  };

  const actionBodyTemplate = (res: Reservation) => (
    <div className="flex gap-2 justify-center">
      <Button icon="pi pi-pencil" rounded onClick={() => openEditDialog(res)} />
      <Button icon="pi pi-trash" rounded severity="danger" onClick={() => handleDelete(res)} />
    </div>
  );

  const filteredReservations =
    statusFilter && statusFilter !== "All"
      ? reservations.filter((res) => res.status === statusFilter)
      : reservations;

  const emptyResMessage = (
    <div className="flex justify-center items-center h-12">
      No reservations available
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <DataTable
        value={filteredReservations}
        paginator
        rows={7}
        header={tableHeader}
        className="rounded-xl overflow-hidden"
        globalFilter={globalFilter}
        tableStyle={{ minWidth: "65rem" }}
        rowHover
        emptyMessage={emptyResMessage}
      >
        <Column field="guestName" header="Guest Name"/>
        <Column field="guestPhone" header="Phone" />
        <Column field="guestEmail" header="Email" />
        <Column field="checkIn" header="Check-In" body={(rowData) => formatDate(rowData.checkIn)} />
        <Column field="checkOut" header="Check-Out" body={(rowData) => formatDate(rowData.checkOut)} />
        <Column header="Status" alignHeader="center" body={statusBodyTemplate} />
        <Column header="Actions" alignHeader="center" body={actionBodyTemplate} />
      </DataTable>

      <ReservationFormDialog
        visible={createDialogVisible}
        onHide={() => setCreateDialogVisible(false)}
        onSave={handleCreate}
      />

      {selectedReservation && (
        <ReservationFormDialog
          visible={editDialogVisible}
          initialReservation={selectedReservation}
          onHide={() => setEditDialogVisible(false)}
          onSave={handleEdit}
        />
      )}
    </>
  );
};