import { AppLayout } from "../../../components/layouts/app-layout.tsx";
import { useEffect, useState } from "react";
import {DataTable, type DataTableRowClickEvent} from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { SearchBar } from "../../../components/ui/SearchBar.tsx";
import { type LocationFormData, LocationFormDialog } from "../../../components/ui/location/LocationFormDialog.tsx";
import { useAuth } from "../../../components/auth/auth.tsx";
import type { Location } from "../../../types";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useNavigate } from "react-router";
import {Card} from "primereact/card";

const LocationsPage = () => {
  const { user } = useAuth();
  const tenantId = user?.id;
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const [locations, setLocations] = useState<Location[]>([]);
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);

  const [createDialogVisible, setCreateDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (!tenantId) return;

    const fetchLocations = async () => {
      try {
        const response = await fetch(`/api/locations?tenantId=${tenantId}`);

        if (!response.ok)
          throw new Error("Failed to fetch locations");

        const data: Location[] = await response.json();
        setLocations(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocations();
  }, [tenantId]);

  const openEditDialog = (loc: Location) => {
    setSelectedLocation(loc);
    setEditDialogVisible(true);
  };

  const handleCreate = async (loc: LocationFormData) => {
    if (!tenantId) return;
    try {
      const body = { tenantId: tenantId, ...loc};
      const response = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok)
        throw new Error("Failed to create location");

      const { newLocation } = await response.json();

      setLocations((prev) => [...prev, newLocation]);
      setCreateDialogVisible(false);

      toast.current?.show({ severity: "success", summary: "Success", detail: "Location created!", life: 3000 });
    } catch (err) {
      console.error(err);
      toast.current?.show({ severity: "error", summary: "Error", detail: "Failed to create location", life: 3000 });
    }
  };

  const handleEdit = async (loc: LocationFormData) => {
    if (!selectedLocation) return;
    try {
      const response = await fetch(`/api/locations/${selectedLocation.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loc),
      });

      if (!response.ok)
        throw new Error("Failed to update location");

      const updatedLocation = await response.json();

      setLocations((prev) =>
        prev.map((l) => (l.id === selectedLocation.id ? updatedLocation : l))
      );
      setEditDialogVisible(false);
      setSelectedLocation(null);

      toast.current?.show({ severity: "success", summary: "Success", detail: "Location updated!", life: 3000 });
    } catch (err) {
      console.error(err);
      toast.current?.show({ severity: "error", summary: "Error", detail: "Failed to edit location", life: 3000 });
    }
  };

  const handleDelete = async (loc: Location) => {
    if (!loc.id) return;

    try {
      const response = await fetch(`/api/locations/${loc.id}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error("Failed to delete location");

      setLocations((prev) => prev.filter((location) => location.id !== loc.id));

      toast.current?.show({ severity: "success", summary: "Deleted", detail: "Location deleted", life: 3000 });
    } catch (err) {
      console.error(err);
      toast.current?.show({ severity: "error", summary: "Error", detail: "Failed to delete location", life: 3000 });
    }
  };

  const handleRowClick = (event: DataTableRowClickEvent) => {
    const location = event.data as Location;
    navigate(`/app/locations/${location.id}`);
  };

  const actionTemplate = (location: Location) => (
    <div className="flex gap-2 items-center justify-center">
      <Button icon="pi pi-pencil" rounded onClick={() => openEditDialog(location)} />
      <Button icon="pi pi-trash" rounded severity="danger" onClick={() => handleDelete(location)} />
    </div>
  );

  const tableHeader = (
    <div className="flex justify-between items-center w-full">
      <h3 className="text-lg font-semibold">Manage Your Locations</h3>
      <div className="flex gap-2 items-center justify-center">
        <SearchBar onInput={(e) => setGlobalFilter(e.target.value)} />
        <Button
          icon="pi pi-plus-circle"
          label="New location"
          severity="success"
          onClick={() => setCreateDialogVisible(true)}
        />
      </div>
    </div>
  );

  const emptyLocMessage = (
    <div className="flex justify-center items-center h-12">
      No locations available
    </div>
  );

  return (
    <AppLayout>
      <Card>
        <Toast ref={toast} />
        <DataTable
          value={locations}
          header={tableHeader}
          globalFilter={globalFilter}
          paginator
          rows={7}
          removableSort
          tableStyle={{ minWidth: "75rem" }}
          className="cursor-pointer"
          onRowClick={handleRowClick}
          rowHover
          emptyMessage={emptyLocMessage}
        >
          <Column field="name" header="Name" style={{ width: '16%' }} />
          <Column field="address" header="Address" style={{ width: '16%' }} />
          <Column field="city" header="City" sortable style={{ width: '16%' }} />
          <Column field="country" header="Country" sortable style={{ width: '16%' }} />
          <Column field="timezone" header="Timezone" style={{ width: '16%' }} />
          <Column header="Actions" body={actionTemplate} alignHeader="center" align="center"/>
        </DataTable>

        <LocationFormDialog
          visible={createDialogVisible}
          onHide={() => setCreateDialogVisible(false)}
          onSave={handleCreate}
        />

        {selectedLocation && (
          <LocationFormDialog
            visible={editDialogVisible}
            initialLocation={selectedLocation}
            onHide={() => setEditDialogVisible(false)}
            onSave={handleEdit}
          />
        )}
      </Card>

    </AppLayout>
  );
};

export default LocationsPage;
